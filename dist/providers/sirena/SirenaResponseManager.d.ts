import { IDataList } from "../../interfaces/IDataList";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
import { IResponseError } from "../../interfaces/IResponseError";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { AbstractResponseManager } from "../../core/response/AbstractResponseManager";
declare type SirenaCompleteResponse = Record<string, Record<"$" | `Success` | `Errors` | `Warnings` | `Document` | `Response` | string, Record<string, never>[] | any[]>>;
export declare class SirenaResponseManager extends AbstractResponseManager {
    conversionStrategy: IConversionStrategy;
    constructor(conversionStrategy: IConversionStrategy);
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    getResponse(rawXML: string): Promise<SirenaResponseMessage>;
    createDataList(title: string, source: Record<string, unknown>[], entityName?: string): IDataList;
}
export declare class SirenaResponseError implements IResponseError {
    code: string;
    text: string;
    constructor(data: {
        ErrorType?: string;
        Code?: string;
        DescText?: string;
    });
}
export declare class SirenaResponseMessage implements IResponseMessage {
    constructor(data: SirenaCompleteResponse);
}
export {};
