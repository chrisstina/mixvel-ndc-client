import { IResponseManager } from "../../interfaces/IResponseManager";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { IResponseMapper } from "../../interfaces/IResponseMapper";
import { IResponseError } from "../../interfaces/IResponseError";
import { IResponseMessage } from "../../interfaces/IResponseMessage";
export declare abstract class AbstractResponseManager implements IResponseManager {
    conversionStrategy: IConversionStrategy;
    protected readonly mapper: IResponseMapper;
    protected constructor(conversionStrategy: IConversionStrategy, mapper: IResponseMapper);
    convert(rawXML: string): Promise<Record<string, any> | null>;
    getResponse(rawXML: string): Promise<IResponseMessage | IResponseError>;
}
