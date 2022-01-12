import {GenericNDCMessage} from "./GenericNDCMessage";

export type SelectedOffer = {
    OfferRefID: string,
    SelectedOfferItem?: Array<{
        OfferItemRefID: string,
        PaxRefID?: Array<string>
    }>
};

export class Mixvel_OfferPriceRQ implements GenericNDCMessage {
    get xmlns() {
        return {"xmlns:OfferPrice": "https://www.mixvel.com/API/XSD/Mixvel_OfferPriceRQ/1_00"}
    }

    get nodeName() {
        return "OfferPrice:Mixvel_OfferPriceRQ"
    }

    public PricedOffer: {
        SelectedOffer: SelectedOffer
    }

    constructor(offerId: string, offerItemIds: string[]) {
        this.PricedOffer = {
            SelectedOffer: {
                OfferRefID: offerId, SelectedOfferItem: offerItemIds.map(offerItemId => {
                    return {
                        "OfferItemRefID": offerItemId
                    }
                })
            }
        }
    }
}