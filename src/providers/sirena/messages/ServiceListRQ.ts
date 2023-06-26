import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { PaxDataList, Offer } from "../../ticketme/messages/OfferPriceRQ";

export class ServiceListRQ extends AbstractSirenaNDCMessage {
  public Query?: { Offer: Offer[] };
  public DataLists?: { PassengerList: PaxDataList };

  get nodeName() {
    return "ServiceListRQ";
  }
}
