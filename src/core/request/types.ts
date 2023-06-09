export type NodeValue<T> = { _: T };
export type StringValue = NodeValue<string>;
export type Cabin = "ECONOMY" | "BUSINESS";
export type PaxCategory =
  | "ADULT"
  | "CHILD"
  | "INFANT"
  | "WSEATINFANT"
  | "YOUTH"
  | "SENIOR"
  | "DISABLED"
  | "DISABLEDCHILD"
  | "ESCORT"
  | "LARGEFAMILY"
  | "STATERESIDENT";
export type DocumentType =
  | "REGULAR_PASSPORT_RU"
  | "BIRTHDAY_CERTIFICATE"
  | "INTERNATIONAL_PASSPORT_RU"
  | "NATIONAL_PASSPORT"
  | "OFFICER_ID"
  | "TEMPORARY_ID"
  | "MILITARY_ID"
  | "RESIDENCE"
  | "SEAMAN_ID"
  | "RETURN_ID";
export type FopType = "CASH" | "BILL" | "CARD";
export type PricingOption = "LOWEST_FARE" | "ALL_FARES";
export type Party = {
  Sender: {
    TravelAgencySender: {
      AgencyID: { _: string }[];
    }[];
  }[];
}[];
