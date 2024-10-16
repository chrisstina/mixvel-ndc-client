import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { PaxCategory } from "../types";
import { Result } from "../../Result";
export declare class OfferItem {
    offerItemId: string;
    ptc?: PaxCategory;
    paxs?: string;
    opts?: any;
    constructor(id: string, ptc?: PaxCategory, paxs?: string, opts?: any);
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
    static create(props: PriceProps): Result<PriceParams>;
    /**
     * @return {offerId: string, offerItemIds: string[]}
     */
    asPlain(): {
        offerId: string;
        offerItemIds: string[];
    };
}
