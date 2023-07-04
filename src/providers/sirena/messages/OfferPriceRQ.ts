import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export type Offer = {
  $: { Owner: string; OfferID: string; ResponseID?: string };
  OfferItem: OfferItem[];
};

export type OfferItem = {
  $: { OfferItemID: string };
  PassengerRefs: StringValue;
};

export type PaxDataList = { Passenger: Passenger[] };
export type Passenger = { $: { PassengerID: string }; PTC: StringValue[] };

export class OfferPriceRQ extends AbstractSirenaNDCMessage {
  public Query?: { Offer: Offer[] };
  public Preference?: {
    FarePreferences?: { $: { PreferencesContext: string } };
  };
  public DataLists?: { PassengerList: PaxDataList };

  constructor() {
    super();
  }

  get nodeName() {
    return "OfferPriceRQ";
  }

  setUpsell() {
    this.Preference = {
      FarePreferences: {
        $: {
          PreferencesContext: "UpsellFares",
        },
      },
    };
  }
}
