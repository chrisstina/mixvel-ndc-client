import { IDataList } from "../../interfaces/IDataList";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseError } from "../../interfaces/IResponseError";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { AbstractResponseManager } from "../../core/response/AbstractResponseManager";
declare type CurrentNamespace = "ns2";
declare type TicketMeCompleteResponse<Namespace extends string> = Record<string, Record<"$" | `${Namespace}:Success` | `${Namespace}:Errors` | `${Namespace}:Warnings` | `${Namespace}:Document` | `${Namespace}:Response` | string, Record<string, never>[] | any[]>>;
export declare class TicketMeResponseManager extends AbstractResponseManager {
    conversionStrategy: IConversionStrategy;
    constructor(conversionStrategy: IConversionStrategy);
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    getResponse(rawXML: string): Promise<TicketMeResponseMessage>;
    createDataList(title: string, source: Record<string, unknown>[], entityName?: string): IDataList;
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
    constructor(data: TicketMeCompleteResponse<CurrentNamespace>);
}
export {};
