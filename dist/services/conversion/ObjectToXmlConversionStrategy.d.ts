import { IConversionStrategy } from "./IConversionSrategy";
export declare class ObjectToXmlConversionStrategy implements IConversionStrategy {
    private xmlBuilder;
    execute(payload: Object): string;
}
