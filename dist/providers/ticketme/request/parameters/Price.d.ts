import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { OfferItem, PriceProps } from "../../../../core/request/parameters/Price";
import { Result } from "../../../../core/Result";
export declare class TicketMeOffer {
    readonly offerId: string;
    offerItems: OfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
export declare class TicketMePriceParams extends AbstractRequestParams {
    readonly offers: TicketMeOffer[];
    private constructor();
    static create(props: PriceProps): Result<TicketMePriceParams>;
}
