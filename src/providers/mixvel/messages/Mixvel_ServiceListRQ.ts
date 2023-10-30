import { INDCMessage } from "../../../interfaces/INDCMessage";

export type OfferRequest = {
  OfferRequest: {
    Offer: {
      OfferID: string;
    };
  };
};

export type OrderRequest = {
  OrderRequest: {
    MixOrder: {
      MixOrderID: string;
    };
  };
};

export class Mixvel_ServiceListRQ implements INDCMessage {
  constructor(public CoreRequest: OfferRequest | OrderRequest) {}

  get xmlns() {
    return {
      "xmlns:Service":
        "https://www.mixvel.com/API/XSD/Mixvel_ServiceListRQ/1_00",
    };
  }

  get nodeName() {
    return "Service:Mixvel_ServiceListRQ";
  }
}
