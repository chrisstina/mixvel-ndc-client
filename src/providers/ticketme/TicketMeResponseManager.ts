import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {IResponseMapper} from "../../interfaces/IResponseMapper";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";
import {AbstractResponseManager} from "../../core/response/AbstractResponseManager";
import ResponseParsingError from "../../core/errors/ResponseParsingError";

type CurrentNamespace = "ns2"

type TicketMeCompleteResponse<Namespace extends string> = Record<string,
    Record<"$" | `${Namespace}:Success` | `${Namespace}:Errors` | `${Namespace}:Warnings` | `${Namespace}:Document` | `${Namespace}:Response` | string,
        Record<string, never>[] | any[]>>

class TicketMeResponseMapper implements IResponseMapper {
    public map(completeResponseObject: Partial<TicketMeCompleteResponse<CurrentNamespace>>): TicketMeResponseError | TicketMeResponseMessage {
        if (completeResponseObject == undefined) {
            throw new ResponseParsingError('Could not find Body node')
        }

        const rootNodeName = Object.keys(completeResponseObject)[0]
        if (!rootNodeName || !completeResponseObject[rootNodeName]) {
            throw new ResponseParsingError('Could not find root node')
        }

        // Business logic error
        const content = completeResponseObject[rootNodeName]
        if (content !== undefined) {
            const errors = content['ns2:Errors']
            if (errors && errors.length > 0) {
                return new TicketMeResponseError({DescText: errors[0]['ns2:Error'][0]._})
            }
        }
        return completeResponseObject
    }
}

export class TicketMeResponseManager extends AbstractResponseManager {
    constructor(
        public conversionStrategy: IConversionStrategy
    ) {
        super(conversionStrategy, new TicketMeResponseMapper())
    }

    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    async getResponse(rawXML: string): Promise<TicketMeResponseMessage> {
        return this.convert(rawXML).then((responseObject) => {
            if (responseObject === null) {
                return Promise.reject(new ResponseParsingError('Response parsed to an empty object'))
            }
            return this.mapper.map(responseObject)
        })
    }
}

export class TicketMeResponseError implements IResponseError {
    code: string;
    text: string;

    constructor(data: { ErrorType?: string, Code?: string, DescText?: string }) {
        this.code = data.Code || '000';
        this.text = data.DescText || ''
    }
}

export class TicketMeResponseMessage implements IResponseMessage {
    constructor(data: TicketMeCompleteResponse<CurrentNamespace>) {
        Object.assign(this, data)
    }
}