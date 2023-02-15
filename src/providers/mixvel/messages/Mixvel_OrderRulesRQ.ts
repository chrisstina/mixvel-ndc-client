import {INDCMessage} from "../../../interfaces/INDCMessage";

export class Mixvel_OrderRulesRQ implements INDCMessage {
  public RulesCoreRequest: Record<string, unknown>;

  constructor(offerOrOrderId: string, offerItemIds?: string[]) {
    if (offerItemIds) {
      // request by offer
      this.RulesCoreRequest = {
        OfferRequest: {
          OfferID: offerOrOrderId,
          OfferItem: offerItemIds.map((offerItemId) => {
            return {
              OfferItemID: offerItemId,
            };
          }),
        },
      };
    } else {
      this.RulesCoreRequest = {
        // request by order
        OrderRequest: {
          OrderID: offerOrOrderId,
        },
      };
    }
  }

  get xmlns() {
    return {
      "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderRulesRQ/1_00",
    };
  }

  get nodeName() {
    return "m:Mixvel_OrderRulesRQ";
  }
}
