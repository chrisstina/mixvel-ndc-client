import {IDataList} from "../../interfaces/IDataList";
import {IResponseMapper} from "../../interfaces/IResponseMapper";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";
import ResponseParsingError from "../../core/errors/ResponseParsingError";
import {AbstractResponseManager} from "../../core/response/AbstractResponseManager";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {allowedDataLists} from "./config/allowedDatalists";
import {MixvelDataList} from "./MixvelDataList";

type MixvelMessage = Record<string, { $: string[], Response?: unknown[], Error?: MixvelError[] }[]>
type MixvelError = { ErrorType?: string, CanRetry?: string, TicketId?: string, Code?: string, DescText?: string[] }
type MixvelCompleteResponse = Record<string, { Body?: { AppData?: MixvelMessage[], Error?: MixvelError[] }[] }>

class MixvelResponseMapper implements IResponseMapper {

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

export class MixvelResponseManager extends AbstractResponseManager {
    public static readonly rootNodeName = "MixEnv:Envelope"
    public readonly allowedDatalists = allowedDataLists

    constructor(
        public responseTypes: string[],
        public conversionStrategy: IConversionStrategy
    ) {
        super(conversionStrategy,
            new MixvelResponseMapper(MixvelResponseManager.rootNodeName, responseTypes),
            allowedDataLists)
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

            if (responseObject[MixvelResponseManager.rootNodeName] === undefined
                || responseObject[MixvelResponseManager.rootNodeName]?.Body === undefined) {
                return Promise.reject(new ResponseParsingError('Invalid response format'))
            }

            return this.mapper.map(responseObject)
        })
    }

    createDataList(dataListTitle: string, dataListSource: Record<string, unknown>[]): IDataList {
        return MixvelDataList.create(dataListTitle, dataListSource)
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
        this.text = data.DescText && data.DescText.length > 0 ? data.DescText [0] : ''
    }
}

export class MixvelResponseMessage implements IResponseMessage {
    constructor(data: unknown) {
        Object.assign(this, data)
    }
}