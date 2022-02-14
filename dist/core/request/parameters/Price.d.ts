import { AbstractParams } from "./AbstractParams";
declare class Offer {
    readonly offerId: string;
    readonly offerItems: OfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
declare type OfferItem = {
    offerItemId: string;
    paxs?: string;
};
export declare type PriceProps = {
    offers: Offer[];
};
export declare class PriceParams extends AbstractParams {
    readonly offers: Offer[];
    private constructor();
}
export {};
