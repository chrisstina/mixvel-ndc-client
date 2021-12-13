import {GenericNDCMessage} from "./GenericNDCMessage";

export class Mixvel_OfferPriceRQ implements GenericNDCMessage {
    get endpoint() {
        return 'api/Order/offerprice'
    }

    get xmlns() {
        return {"xmlns:OfferPrice": "https://www.mixvel.com/API/XSD/Mixvel_OfferPriceRQ/1_00"}
    }

    get nodeName() {
        return "OfferPrice:Mixvel_OfferPriceRQ"
    }

    public PricedOffer: {
        SelectedOffer: {
            OfferRefID: string,
            SelectedOfferItem: {
                OfferItemRefID: string[]
            }
        }
    }

    constructor(offerId: string, offerItemIds: string[]) {
        this.PricedOffer = {SelectedOffer: {OfferRefID: offerId, SelectedOfferItem: {OfferItemRefID: offerItemIds}}}
    }
}