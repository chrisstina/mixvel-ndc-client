import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseError } from "../../interfaces/IResponseError";
import { AbstractResponseManager } from "../../core/response/AbstractResponseManager";
export declare class MixvelResponseManager extends AbstractResponseManager {
    responseTypes: string[];
    conversionStrategy: IConversionStrategy;
    static readonly rootNodeName = "MixEnv:Envelope";
    constructor(responseTypes: string[], conversionStrategy: IConversionStrategy);
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
