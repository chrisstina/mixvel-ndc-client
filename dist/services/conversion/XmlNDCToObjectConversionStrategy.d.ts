import { IConversionStrategy } from "./IConversionSrategy";
export declare class XmlNDCToObjectConversionStrategy implements IConversionStrategy {
    readonly ndcVersion: string;
    constructor(ndcVersion: string);
    execute(payload: Record<string, any>): Promise<Record<string, any>> | null;
}
