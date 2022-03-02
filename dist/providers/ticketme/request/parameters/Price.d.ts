import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { OfferItem } from "../../../../core/request/parameters/Price";
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
}
