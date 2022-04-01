import {IDataList} from "../../interfaces/IDataList";
import {IResponseMapper} from "../../interfaces/IResponseMapper";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {AbstractResponseManager} from "../../core/response/AbstractResponseManager";
import ResponseParsingError from "../../core/errors/ResponseParsingError";
import {allowedDataLists} from "./config/allowedDatalists";
import {TicketMeDataList} from "./TicketMeDataList";

type CurrentNamespace = "ns2"

type TicketMeCompleteResponse<Namespace extends string> = Record<string,
    Record<"$" | `${Namespace}:Success` | `${Namespace}:Errors` | `${Namespace}:Warnings` | `${Namespace}:Document` | `${Namespace}:Response` | string,
        Record<string, never>[] | any[]>>

class TicketMeResponseMapper implements IResponseMapper {
    private static toError(errorNode: {_?: string, $?: Record<string, string>}): TicketMeResponseError {
        const errorText = errorNode._ || errorNode.$?.ShortText
        return new TicketMeResponseError({DescText: errorText, ErrorType: errorNode.$?.Type, Code: errorNode.$?.Code})
    }

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
                return TicketMeResponseMapper.toError(errors[0]['ns2:Error'][0])
            }
        }
        return completeResponseObject
    }
}

export class TicketMeResponseManager extends AbstractResponseManager {
    constructor(
        public conversionStrategy: IConversionStrategy
    ) {
        super(conversionStrategy, new TicketMeResponseMapper(), allowedDataLists)
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

    createDataList(title: string, source: Record<string, unknown>[], entityName?: string): IDataList {
        return TicketMeDataList.create(title, source, entityName);
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