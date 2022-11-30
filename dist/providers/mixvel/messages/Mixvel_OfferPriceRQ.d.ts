import {INDCMessage} from "../../../interfaces/INDCMessage";

export declare type SelectedOffer = {
    OfferRefID: string;
    SelectedOfferItem?: Array<{
        OfferItemRefID: string;
        PaxRefID?: Array<string>;
    }>;
};
export declare class Mixvel_OfferPriceRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:OfferPrice": string;
    };
    get nodeName(): string;
    PricedOffer: {
        SelectedOffer: SelectedOffer;
    };
    constructor(offerId: string, offerItemIds: string[]);
}
