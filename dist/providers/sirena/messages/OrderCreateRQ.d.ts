import { NodeValue, StringValue } from "../../../core/request/types";
import { Offer } from "../../ticketme/messages/OfferPriceRQ";
import { SirenaDocumentType } from "../mappers/dictionary/documentType";
import { SirenaPTC } from "../mappers/dictionary/ptc";
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
declare type LoyaltyProgramAccount = {
    Airline: {
        AirlineDesignator: StringValue[];
    };
    AccountNumber: StringValue[];
};
declare type PhoneLabel = "mobile" | "agency";
export declare class Pax {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
    CitizenshipCountryCode: StringValue[];
    Individual: Individual[];
    IdentityDocument: IdentityDocument[];
    ContactInfoRef: StringValue[];
    InfantRef?: StringValue[];
    LoyaltyProgramAccount?: LoyaltyProgramAccount[];
    constructor(id: string, ptc: SirenaPTC, issuingCountry: string, individual: Individual, document: IdentityDocument, contactRef: string);
    attachInfant(infantRef?: string): void;
}
export declare type PaxContact = {
    $: {
        ContactID: string;
    };
    ContactType: {
        _: "Primary";
    }[];
    ContactProvided: Array<{
        EmailAddress: {
            EmailAddressValue: StringValue[];
        }[];
    } | {
        Phone: {
            Label?: NodeValue<PhoneLabel>[];
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
export {};
