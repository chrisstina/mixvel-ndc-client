import { NodeValue, StringValue } from "../../../core/request/types";
import { Offer } from "../../ticketme/messages/OfferPriceRQ";
import { SirenaDocumentType } from "../mappers/dictionary/documentType";
import { SirenaPTC } from "../mappers/dictionary/ptc";
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

export class Pax {
  public $: { PassengerID: string };
  public PTC: StringValue[] = [];
  public CitizenshipCountryCode: StringValue[];
  public Individual: Individual[];
  public IdentityDocument: IdentityDocument[];
  public ContactInfoRef: StringValue[];
  public InfantRef?: StringValue[] = [];

  // @todo LoyaltyProgramAccount

  constructor(
    id: string,
    ptc: SirenaPTC,
    issuingCountry: string,
    individual: Individual,
    document: IdentityDocument,
    contactRef: string
  ) {
    this.$ = { PassengerID: id };
    this.PTC.push({ _: ptc });
    this.CitizenshipCountryCode = [{ _: issuingCountry }];
    this.Individual = [individual];
    this.IdentityDocument = [document];
    this.ContactInfoRef = [{ _: contactRef }];
  }

  attachInfant(infantRef?: string) {
    if (infantRef) {
      this.InfantRef = [{ _: infantRef }];
    }
  }
}

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
