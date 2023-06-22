import { PaxCategory } from "../../../../core/request/types";
import { AbstractRequestParams, RequestProps } from "../../../../core/request/parameters/AbstractRequestParams";
import { Result } from "../../../../core/Result";
export declare class MixvelOfferItem {
    offerItemId: string;
    ptc?: PaxCategory;
    paxs?: string;
    constructor(id: string, ptc?: PaxCategory, paxs?: string);
}
export declare class MixvelOffer {
    readonly offerId: string;
    offerItems: MixvelOfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: MixvelOfferItem[], offerOwner?: string, responseId?: string);
}
export declare type PriceProps = RequestProps<MixvelPriceParams>;
export declare class MixvelPriceParams extends AbstractRequestParams {
    readonly offers: MixvelOffer[];
    private constructor();
    static create(props: PriceProps): Result<MixvelPriceParams>;
    /**
     * @return {offerId: string, offerItemIds: string[]}
     */
    asPlain(): {
        offerId: string;
        offerItemIds: string[];
    };
}
