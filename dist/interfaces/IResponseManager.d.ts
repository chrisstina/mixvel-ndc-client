import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
import { MixvelResponseError, MixvelResponseMessage } from "../providers/mixvel/MixvelResponseManager";
export interface IResponseManager {
    conversionStrategy: IConversionStrategy;
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    getResponse(rawXML: string): Promise<MixvelResponseMessage | MixvelResponseError>;
}
