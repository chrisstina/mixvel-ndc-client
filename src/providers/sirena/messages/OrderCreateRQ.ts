import { NodeValue, StringValue } from "../../../core/request/types";
import { Offer } from "../../ticketme/messages/OfferPriceRQ";
import { SirenaDocumentType } from "../mappers/dictionary/documentType";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export type Individual = {
  GivenName: StringValue[];
  Surname: StringValue[];
  MiddleName?: StringValue[];
  Birthdate: StringValue[];
  Gender: NodeValue<"Male" | "Female" | "Unspecified">[];
};

export type IdentityDocument = {
  IdentityDocumentNumber: StringValue[];
  IdentityDocumentType: NodeValue<SirenaDocumentType>[];
  ExpiryDate: StringValue[];
  Birthdate: StringValue[];
  NameTitle: NodeValue<"Mr" | "Mrs">[];
  GivenName: StringValue[];
  Surname: StringValue[];
};

export type Pax = {
  $: { PassengerID: string };
  PTC: StringValue[];
  CitizenshipCountryCode: StringValue[];
  Individual: Individual[];
  IdentityDocument: IdentityDocument[];
  ContactInfoRef: StringValue[];
  // @todo LoyaltyProgramAccount
};

export type PaxContact = {
  $: { ContactID: string };
  ContactProvided: Array<
    | { EmailAddress: { EmailAddressValue: StringValue[] }[] }
    | { Phone: { PhoneNumber: StringValue[] }[] }
  >;
};

export class OrderCreateRQ extends AbstractSirenaNDCMessage {
  public Query: {
    Order: { Offer: Offer[] }[];
    DataLists: {
      PassengerList: {
        Passenger: Pax[];
      }[];
      ContactList: {
        ContactInformation: PaxContact[];
      }[];
    }[];
    Metadata?: [];
  }[];

  constructor(offer: Offer) {
    super();
    this.Query = [
      {
        Order: [{ Offer: [offer] }],
        DataLists: [
          {
            PassengerList: [
              {
                Passenger: [],
              },
            ],
            ContactList: [
              {
                ContactInformation: [],
              },
            ],
          },
        ],
      },
    ];
  }

  get nodeName() {
    return "OrderCreateRQ";
  }
}
