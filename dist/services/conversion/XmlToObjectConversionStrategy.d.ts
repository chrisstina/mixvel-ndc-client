import { IConversionStrategy } from "./IConversionSrategy";
export declare class XmlToObjectConversionStrategy implements IConversionStrategy {
    execute(payload: Object): Promise<Object>;
}
