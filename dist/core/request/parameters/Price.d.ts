import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { PaxCategory } from "../types";
export declare class OfferItem {
    offerItemId: string;
    ptc?: PaxCategory;
    paxs?: string;
    constructor(id: string, ptc?: PaxCategory, paxs?: string);
}
export declare class Offer {
    readonly offerId: string;
    offerItems: OfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
export declare type PriceProps = RequestProps<PriceParams>;
export declare class PriceParams extends AbstractRequestParams {
    readonly offers: Offer[];
    private constructor();
}
