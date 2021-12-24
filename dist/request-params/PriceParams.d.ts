import { GenericRequestParams } from "./GenericRequestParams";
export declare class PriceParams implements GenericRequestParams {
    readonly offerId: string;
    readonly offerItemIds: string[];
    constructor(offerId: string, offerItemIds: string[]);
}
