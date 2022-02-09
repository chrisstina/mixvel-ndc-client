import ResponseParsingError from "../../core/errors/ResponseParsingError";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {IResponseManager} from "../../interfaces/IResponseManager";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";

type MixvelMessage = Record<string, { $: string[], Response?: unknown[], Error?: MixvelError[] }[]>
type MixvelError = { ErrorType?: string, CanRetry?: string, TicketId?: string, Code?: string, DescText?: string[] }
type MixvelCompleteResponse = Record<string, { Body?: { AppData?: MixvelMessage[], Error?: MixvelError[] }[] }>

class MixvelResponseMapper {

    constructor(
        public readonly rootNodeName: string,
        public readonly allowedResponseNodeNames: string[]) {
    }

    public map(completeResponseObject: MixvelCompleteResponse): MixvelResponseError | MixvelResponseMessage {
        let appData
        const body = completeResponseObject[this.rootNodeName].Body

        if (body == undefined) {
            throw new ResponseParsingError('Could not find Body node')
        }

        // General error
        if (body[0].Error && body[0].Error[0]) {
            return new MixvelResponseError(body[0].Error[0])
        }

        if (body[0].AppData && body[0].AppData.length > 0) {
            appData = body[0].AppData[0]
        }

        if (appData == undefined) {
            throw new ResponseParsingError('Could not find AppData node')
        }

        const nodename: string = Object.keys(appData)[0]
        if (!this.allowedResponseNodeNames.includes(nodename)) {
            throw new ResponseParsingError(`Unknown response node ${nodename}`)
        }

        const mixvelMessage = appData[nodename][0] // Enveloped content

        // Business logic error
        const mixvelError = mixvelMessage.Error
        if (mixvelError && mixvelError[0]) {
            return new MixvelResponseError(mixvelError[0])
        }

        if (mixvelMessage.Response && mixvelMessage.Response[0]) {
            return new MixvelResponseMessage(mixvelMessage.Response[0])
        }

        return new MixvelResponseMessage(mixvelMessage)
    }
}

export class MixvelResponseManager implements IResponseManager {
    public readonly rootNodeName = "MixEnv:Envelope"
    private readonly _mapper: MixvelResponseMapper

    constructor(
        public responseTypes: string[],
        public conversionStrategy: IConversionStrategy
    ) {
        this._mapper = new MixvelResponseMapper(this.rootNodeName, this.responseTypes)
    }

    convert(rawXML: string): Promise<Record<string, any> | null> {
        const conversionPromise = this.conversionStrategy.execute(rawXML);
        let convertedResult: Record<string, unknown> | null;

        if (typeof conversionPromise === "string") {
            throw new ResponseParsingError('Converted to unexpected type')
        }

        if (!(conversionPromise instanceof Promise)) {
            convertedResult = conversionPromise;
            return Promise.resolve().then(() => convertedResult);
        }
        return conversionPromise;
    }

    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    async getResponse(rawXML: string): Promise<MixvelResponseMessage | MixvelResponseError> {
        return this.convert(rawXML).then((responseObject) => {
            if (responseObject === null) {
                return Promise.reject(new ResponseParsingError('Response parsed to an empty object'))
            }

            if (responseObject[this.rootNodeName] === undefined
                || responseObject[this.rootNodeName]?.Body === undefined) {
                return Promise.reject(new ResponseParsingError('Invalid response format'))
            }

            return this._mapper.map(responseObject)
        })
    }
}

/**
 * // <ErrorType>InternalServerError</ErrorType>
 // <CanRetry>false</CanRetry>
 // <TicketId>b7348ba4-c300-48f6-8499-acabd8c4596b</TicketId>
 // <Code>MIX-200002</Code>
 // <DescText>Внутренняя ошибка сервиса. Обратитесь в службу технической поддержки (неисправность № b7348ba4-c300-48f6-8499-acabd8c4596b)</DescText>
 */
export class MixvelResponseError implements IResponseError {
    code: string;
    text: string;

    constructor(data: { ErrorType?: string, Code?: string, DescText?: string[] }) {
        this.code = data.Code || '000';
        this.text = data.DescText && data.DescText.length > 0? data.DescText [0] : ''
    }
}

export class MixvelResponseMessage implements IResponseMessage {
    constructor(data: unknown) {
        Object.assign(this, data)
    }
}