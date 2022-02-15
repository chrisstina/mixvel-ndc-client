import {INDCMessage} from "../../../interfaces/INDCMessage";

export class Mixvel_OrderRulesRQ implements INDCMessage {
    get xmlns() {
        return {"xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderRulesRQ/1_00"}
    }

    get nodeName() {
        return "m:Mixvel_OrderRulesRQ"
    }

    public RulesCoreRequest: Record<string, unknown>

    constructor(offerId: string, offerItemIds: string[]) {
        this.RulesCoreRequest = {
            "OfferRequest": {
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