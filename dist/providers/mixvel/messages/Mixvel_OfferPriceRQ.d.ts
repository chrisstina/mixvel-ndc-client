import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
export declare type SelectedOffer = {
    OfferRefID: string;
    SelectedOfferItem?: Array<{
        OfferItemRefID: string;
        PaxRefID?: Array<string>;
    }>;
};
export declare class Mixvel_OfferPriceRQ implements GenericNDCMessage {
    get xmlns(): {
        "xmlns:OfferPrice": string;
    };
    get nodeName(): string;
    PricedOffer: {
        SelectedOffer: SelectedOffer;
    };
    constructor(offerId: string, offerItemIds: string[]);
}
