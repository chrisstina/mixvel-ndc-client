import { AbstractParams } from "./AbstractParams";
import { PaxCategory } from "../types";
declare class OfferItem {
    offerItemId: string;
    ptc?: PaxCategory;
    paxs?: string;
    constructor(id: string, ptc?: PaxCategory, paxs?: string);
}
export declare class Offer {
    readonly offerId: string;
    readonly offerItems: OfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
export declare type PriceProps = {
    offers: Offer[];
};
export declare class PriceParams extends AbstractParams {
    readonly offers: Offer[];
    private constructor();
}
export {};
