import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseError } from "../../interfaces/IResponseError";
import { AbstractResponseManager } from "../../core/response/AbstractResponseManager";
declare type TicketMeCompleteResponse = Record<string, {
    $: Record<string, string>;
    "ns2:Success"?: Record<string, never>[];
    "ns2:Errors"?: any[];
    "ns2:Warnings"?: any[];
    "ns2:Document"?: Record<string, never>[];
    "ns2:Response"?: [];
}>;
export declare class TicketMeResponseManager extends AbstractResponseManager {
    conversionStrategy: IConversionStrategy;
    constructor(conversionStrategy: IConversionStrategy);
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    getResponse(rawXML: string): Promise<TicketMeResponseMessage>;
}
export declare class TicketMeResponseError implements IResponseError {
    code: string;
    text: string;
    constructor(data: {
        ErrorType?: string;
        Code?: string;
        DescText?: string;
    });
}
export declare class TicketMeResponseMessage implements IResponseMessage {
    constructor(data: TicketMeCompleteResponse);
}
export {};
