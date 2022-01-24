import { GenericNDCMessage } from "./GenericNDCMessage";
import { SelectedOffer } from "./Mixvel_OfferPriceRQ";
import { MixvelDocumentType } from "../mappers/dictionary/documentType";
declare type ContactTypeText = "personal";
export declare class Pax {
    AgeMeasure: string;
    ContactInfoRefID: string;
    IdentityDoc: {
        ExpiryDate: string;
        IdentityDocID: string;
        IssueDate: string;
        Surname: string;
        IdentityDocTypeCode: MixvelDocumentType;
        IssuingCountryCode: string;
    };
    Individual: {
        GenderCode: string;
        GivenName: string;
        Birthdate: string;
        MiddleName: string;
        Surname: string;
    };
    PaxID: string;
    PTC: string;
    constructor(AgeMeasure: string, ContactInfoRefID: string, IdentityDoc: {
        ExpiryDate: string;
        IdentityDocID: string;
        IssueDate: string;
        Surname: string;
        IdentityDocTypeCode: MixvelDocumentType;
        IssuingCountryCode: string;
    }, Individual: {
        GenderCode: string;
        GivenName: string;
        Birthdate: string;
        MiddleName: string;
        Surname: string;
    }, PaxID: string, PTC: string);
}
export declare class ContactInfo {
    ContactInfoID: string;
    EmailAddress: {
        ContactTypeText: ContactTypeText;
        EmailAddressText: string;
    };
    Phone: {
        ContactTypeText: ContactTypeText;
        PhoneNumber: string;
    };
    constructor(ContactInfoID: string, EmailAddress: {
        ContactTypeText: ContactTypeText;
        EmailAddressText: string;
    }, Phone: {
        ContactTypeText: ContactTypeText;
        PhoneNumber: string;
    });
}
export declare class Mixvel_OrderCreateRQ implements GenericNDCMessage {
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    CreateOrder: {
        SelectedOffer: SelectedOffer;
    };
    DataLists: {
        "ContactInfoList": {
            "ContactInfo": Array<ContactInfo>;
        };
        "PaxList": {
            "Pax": Array<Pax>;
        };
    };
    constructor(offerId: string);
    addPax(pax: Pax, paxContact: ContactInfo): void;
    /**
     * @param {string} offerItemId
     * @param {string[]} paxRefs
     */
    addSelectedOfferItem(offerItemId: string, paxRefs: Array<string>): void;
}
export {};
