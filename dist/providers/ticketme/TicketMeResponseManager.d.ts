import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {IResponseManager} from "../../interfaces/IResponseManager";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IResponseError} from "../../interfaces/IResponseError";

declare type TicketMeCompleteResponse = Record<string, {
    $: Record<string, string>;
    "ns2:Success"?: Record<string, never>[];
    "ns2:Errors"?: any[];
    "ns2:Warnings"?: any[];
    "ns2:Document"?: Record<string, never>[];
    "ns2:Response"?: [];
}>;
export declare class TicketMeResponseManager implements IResponseManager {
    conversionStrategy: IConversionStrategy;
    private _mapper;
    constructor(conversionStrategy: IConversionStrategy);
    convert(rawXML: string): Promise<Record<string, any> | null>;
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
