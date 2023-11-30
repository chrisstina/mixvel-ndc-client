import { IConversionStrategy } from "./IConversionSrategy";
export declare class XmlToObjectConversionStrategy implements IConversionStrategy {
    execute(payload: Record<string, unknown>): Promise<Record<string, unknown>>;
}
