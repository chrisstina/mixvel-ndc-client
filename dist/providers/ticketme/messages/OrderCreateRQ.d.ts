import { AbstractTicketMeNDCMessage, NodeValue, StringValue } from "./AbstractTicketMeNDCMessage";
import { Offer } from "./OfferPriceRQ";
import { TicketmeDocumentType } from "../mappers/dictionary/documentType";
export declare type IdentityDocument = {
    "IdentityDocumentNumber": StringValue[];
    "IdentityDocumentType": NodeValue<TicketmeDocumentType>[];
    "ExpiryDate": StringValue[];
    "Birthdate": StringValue[];
    "NameTitle": NodeValue<"Mr" | "Mrs">[];
    "GivenName": StringValue[];
    "Surname": StringValue[];
};
export declare type Pax = {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
    CitizenshipCountryCode: StringValue[];
    IdentityDocument: IdentityDocument[];
    ContactInfoRef: StringValue[];
};
export declare type PaxContact = {
    "$": {
        "ContactID": string;
    };
    "ContactProvided": Array<{
        "EmailAddress": {
            "EmailAddressValue": StringValue[];
        }[];
    } | {
        "Phone": {
            "PhoneNumber": StringValue[];
        }[];
    }>;
};
export declare class OrderCreateRQ extends AbstractTicketMeNDCMessage {
    get nodeName(): string;
    Query: {
        Order: {
            Offer: Offer[];
        }[];
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
    constructor(offer: Offer);
    addPax(pax: Pax, paxContact: PaxContact): void;
}
