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
  public Query: OfferRequest | OrderRequest;
  public DataLists?: { PassengerList: PaxDataList };

  constructor(query: OfferRequest | OrderRequest, dataLists?: { PassengerList: PaxDataList }) {
    super();
    this.Query = query;
    if (dataLists) {
      this.DataLists = dataLists;
    }
  }

  get nodeName() {
    return "ServiceListRQ";
  }
}
