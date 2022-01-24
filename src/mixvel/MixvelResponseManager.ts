import ResponseParsingError from "../core/errors/ResponseParsingError";
import {IConversionStrategy} from "../services/conversion/IConversionSrategy";

type MixvelMessage = { [type: string]: { $: string[], Response?: any[], Error?: any[] }[] }
type MixvelCompleteResponse = {
    [type: string]: { Body?: { AppData?: MixvelMessage[] }[] }
}

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

export class MixvelResponseManager {
    public readonly rootNodeName = "MixEnv:Envelope"
    private readonly _mapper: MixvelResponseMapper

    constructor(
        public responseTypes: string[],
        public conversionStrategy: IConversionStrategy
    ) {
        this._mapper = new MixvelResponseMapper(this.rootNodeName, this.responseTypes)
    }

    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    async getResponse(rawXML: string): Promise<MixvelResponseMessage | MixvelResponseError> {
        const convert = function (conversionStrategy: IConversionStrategy): Promise<any> {
            const conversionPromise = conversionStrategy.execute(rawXML);
            let convertedResult: Object | null;

            if (!(conversionPromise instanceof Promise)) {
                convertedResult = conversionPromise;
                return Promise.resolve().then(() => convertedResult);
            }
            return conversionPromise;
        }

        return convert(this.conversionStrategy).then((responseObject) => {
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
export class MixvelResponseError {
    public readonly isMixvelError: boolean = true
    public ErrorType: string;
    public CanRetry: boolean;
    public TicketId: string;
    public Code: string;
    public DescText;

    constructor(data: { ErrorType?: string, CanRetry?: string, TicketId?: string, Code?: string, DescText?: string[] }) {
        this.ErrorType = data.ErrorType || '';
        this.CanRetry = data.CanRetry === 'true' || false;
        this.TicketId = data.TicketId || '';
        this.Code = data.Code || '000';
        this.DescText = data.DescText || ''
    }
}

export class MixvelResponseMessage {
    constructor(data: any) {
        Object.assign(this, data)
    }
}