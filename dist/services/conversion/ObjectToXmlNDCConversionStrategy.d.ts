import {IConversionStrategy} from "./IConversionSrategy";

/**
 * Uses IATA NDC JSON to XML converter, compatible to NDC versions up to 18.2
 */
export declare class ObjectToXmlNDCConversionStrategy implements IConversionStrategy {
    readonly ndcVersion: string;
    /**
     * @param {string} ndcVersion e.g. 172 for NDC 17.2, 182 for NDC 18.2
     */
    constructor(ndcVersion: string);
    execute(payload: Record<string, unknown>): string;
}
