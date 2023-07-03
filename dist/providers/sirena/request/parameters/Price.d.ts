import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { OfferItem, PriceProps } from "../../../../core/request/parameters/Price";
import { PaxCategory } from "../../../../core/request/types";
import { Result } from "../../../../core/Result";
declare class SirenaFareRule {
    readonly from: string;
    readonly to: string;
    readonly carrier: string;
    readonly date: string;
    readonly fareBasisCode: string;
    readonly fareRuleLocator: string;
    constructor(from: string, to: string, carrier: string, date: string, fareBasisCode: string, fareRuleLocator: string);
}
export declare class SirenaOfferItemOpts {
    innerPTC: string;
    fareRule?: SirenaFareRule;
    constructor(opts?: {
        innerPTC?: string;
        fareRule?: {
            from: string;
            to: string;
            carrier: string;
            date: string;
            fareBasisCode: string;
            fareRuleLocator: string;
        };
    });
}
declare class SirenaOfferItem extends OfferItem {
    ptc?: PaxCategory;
    paxs?: string;
    opts?: SirenaOfferItemOpts;
    constructor(offerItemId: string, ptc?: PaxCategory, paxs?: string, opts?: SirenaOfferItemOpts);
}
export declare class SirenaOffer {
    readonly offerId: string;
    offerItems: SirenaOfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
export declare class SirenaPriceParams extends AbstractRequestParams {
    readonly offers: SirenaOffer[];
    private constructor();
    static create(props: PriceProps): Result<SirenaPriceParams>;
}
export {};
