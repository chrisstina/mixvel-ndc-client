import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { PaxDataList, Offer } from "../../ticketme/messages/OfferPriceRQ";

export type OfferRequest = { Offer: Offer[] };

export type OrderRequest = {
  OrderID: {
    $: { Owner: string };
    _: string;
  };
};

export class ServiceListRQ extends AbstractSirenaNDCMessage {
  public readonly ShoppingResponseID;
  public readonly Query: OfferRequest | OrderRequest;
  public readonly DataLists?: { PassengerList: PaxDataList };

  constructor(
    query: OfferRequest | OrderRequest,
    dataLists?: {
      PassengerList: PaxDataList;
    },
    shoppingResponseId?: string
  ) {
    super();
    if (shoppingResponseId) {
      this.ShoppingResponseID = [
        {
          ResponseID: [{ _: shoppingResponseId }],
        },
      ];
    }

    this.Query = query;
    if (dataLists) {
      this.DataLists = dataLists;
    }
  }

  get nodeName() {
    return "ServiceListRQ";
  }
}
