import {IConversionStrategy} from "../services/conversion/IConversionSrategy";
import {IDataList} from "./IDataList";
import {IResponseMessage} from "./IResponseMessage";
import {IResponseError} from "./IResponseError";

export interface IResponseManager {
    conversionStrategy: IConversionStrategy;
    allowedDatalists: Record<string, string>;
    getResponse(rawXML: string): Promise<IResponseMessage | IResponseError>;
    createDataList(title: string, source: Record<string, unknown>[]) : IDataList
}
