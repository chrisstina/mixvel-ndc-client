import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
export declare class MixvelResponseManager {
    responseTypes: string[];
    conversionStrategy: IConversionStrategy;
    readonly rootNodeName = "MixEnv:Envelope";
    private readonly _mapper;
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
export declare class MixvelResponseError {
    readonly isMixvelError: boolean;
    ErrorType: string;
    CanRetry: boolean;
    TicketId: string;
    Code: string;
    DescText: string | string[];
    constructor(data: {
        ErrorType?: string;
        CanRetry?: string;
        TicketId?: string;
        Code?: string;
        DescText?: string[];
    });
}
export declare class MixvelResponseMessage {
    constructor(data: any);
}
