import { IConversionStrategy } from "./IConversionSrategy";
export declare class XmlConversionStrategy implements IConversionStrategy {
    private xmlBuilder;
    execute(payload: Object): string;
}
