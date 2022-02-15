import {INDCMessage} from "../../../interfaces/INDCMessage";

export class Mixvel_ServiceListRQ implements INDCMessage {
    get xmlns() {
        return {"xmlns:Service": "https://www.mixvel.com/API/XSD/Mixvel_ServiceListRQ/1_00"}
    }

    get nodeName() {
        return "Service:Mixvel_ServiceListRQ"
    }

    public CoreRequest = {}

    constructor(offerId: string, offerItemIds: string[]) {
        this.CoreRequest = {
            "OfferRequest": {
                "Offer": {
                    "OfferID": offerId,
                    "OfferItem": offerItemIds.map(offerItemId => {
                        return {
                            "OfferItemID": offerItemId
                        }
                    })
                }
            }
        }
    }
}