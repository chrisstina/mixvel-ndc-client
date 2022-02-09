import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {IResponseManager} from "../../interfaces/IResponseManager";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";

export declare class MixvelResponseManager implements IResponseManager {
    responseTypes: string[];
    conversionStrategy: IConversionStrategy;
    readonly rootNodeName = "MixEnv:Envelope";
    private readonly _mapper;
    constructor(responseTypes: string[], conversionStrategy: IConversionStrategy);
    convert(rawXML: string): Promise<Record<string, any> | null>;
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    getResponse(rawXML: string): Promise<MixvelResponseMessage | MixvelResponseError>;
}
/**
 * // <ErrorType>InternalServerError</ErrorType>
 // <CanRetry>false</CanRetry>
 // <TicketId>b7348ba4-c300-48f6-8499-acabd8c4596b</TicketId>
 // <Code>MIX-200002</Code>
 // <DescText>Внутренняя ошибка сервиса. Обратитесь в службу технической поддержки (неисправность № b7348ba4-c300-48f6-8499-acabd8c4596b)</DescText>
 */
export declare class MixvelResponseError implements IResponseError {
    code: string;
    text: string;
    constructor(data: {
        ErrorType?: string;
        Code?: string;
        DescText?: string[];
    });
}
export declare class MixvelResponseMessage implements IResponseMessage {
    constructor(data: unknown);
}
