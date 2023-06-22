import { NodeValue, StringValue } from "../../../core/request/types";
import { Offer } from "../../ticketme/messages/OfferPriceRQ";
import { SirenaDocumentType } from "../mappers/dictionary/documentType";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
export declare type Individual = {
    GivenName: StringValue[];
    Surname: StringValue[];
    MiddleName?: StringValue[];
    Birthdate: StringValue[];
    Gender: NodeValue<"Male" | "Female" | "Unspecified">[];
};
export declare type IdentityDocument = {
    IdentityDocumentNumber: StringValue[];
    IdentityDocumentType: NodeValue<SirenaDocumentType>[];
    ExpiryDate: StringValue[];
    Birthdate: StringValue[];
    NameTitle: NodeValue<"Mr" | "Mrs">[];
    GivenName: StringValue[];
    Surname: StringValue[];
};
export declare type Pax = {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
    CitizenshipCountryCode: StringValue[];
    Individual: Individual[];
    IdentityDocument: IdentityDocument[];
    ContactInfoRef: StringValue[];
};
export declare type PaxContact = {
    $: {
        ContactID: string;
    };
    ContactProvided: Array<{
        EmailAddress: {
            EmailAddressValue: StringValue[];
        }[];
    } | {
        Phone: {
            PhoneNumber: StringValue[];
        }[];
    }>;
};
export declare class OrderCreateRQ extends AbstractSirenaNDCMessage {
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
    get nodeName(): string;
}
