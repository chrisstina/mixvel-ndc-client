import { AbstractParams } from "./AbstractParams";
declare type Offer = {
    offerId: string;
    offerItems: OfferItem[];
    offerOwner?: string;
    responseId?: string;
};
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
