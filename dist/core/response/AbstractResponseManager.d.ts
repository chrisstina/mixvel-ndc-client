import {IDataList} from "../../interfaces/IDataList";
import {IResponseManager} from "../../interfaces/IResponseManager";
import {IResponseMapper} from "../../interfaces/IResponseMapper";
import {IResponseError} from "../../interfaces/IResponseError";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";

export declare abstract class AbstractResponseManager implements IResponseManager {
    conversionStrategy: IConversionStrategy;
    protected readonly mapper: IResponseMapper;
    readonly allowedDatalists: Record<string, string | string[]>;
    protected constructor(conversionStrategy: IConversionStrategy, mapper: IResponseMapper, allowedDatalists: Record<string, string | string[]>);
    convert(rawXML: string): Promise<Record<string, any> | null>;
    getResponse(rawXML: string): Promise<IResponseMessage | IResponseError>;
    createDataList(title: string, source: Record<string, unknown>[]): IDataList;
}
