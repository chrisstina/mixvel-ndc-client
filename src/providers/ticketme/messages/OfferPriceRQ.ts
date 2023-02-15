import {
  AbstractTicketMeNDCMessage,
  StringValue,
} from "./AbstractTicketMeNDCMessage";

export type Offer = {
  $: { Owner: string; OfferID: string; ResponseID: string };
  OfferItem: OfferItem[];
};

type OfferItem = {
  $: { OfferItemID: string };
  PassengerRefs: StringValue;
};

export type PaxDataList = { Passenger: Passenger[] };
export type Passenger = { $: { PassengerID: string }; PTC: StringValue[] };

export class OfferPriceRQ extends AbstractTicketMeNDCMessage {
  public Query?: { Offer: Offer[] };
  public DataLists?: { PassengerList: PaxDataList };

  constructor() {
    super();
  }

  get nodeName() {
    return "OfferPriceRQ";
  }
}
