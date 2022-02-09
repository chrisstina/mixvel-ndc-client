import {AbstractParams} from "./AbstractParams";
import {DocumentType, PaxCategory} from "../types";

export declare type BookProps = {
    offerId: string;
    offerItemIds: Array<{
        id: string;
        ptc: PaxCategory;
    }>;
    passengers: Array<Passenger>;
};
export declare class BookParams extends AbstractParams {
    readonly offerId: string;
    readonly offerItemIds: Array<OfferItem>;
    readonly passengers: Array<Passenger>;
    private constructor();
}
declare class OfferItem {
    id: string;
    ptc: PaxCategory;
    constructor(id: string, ptc: PaxCategory);
}
declare class PersonalInfo {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: "M" | "F";
    dob: Date;
    constructor(firstName: string, lastName: string, gender: "M" | "F", dob: Date, middleName?: string);
}
declare class IdentityDocument {
    type: DocumentType;
    number: string;
    issuingCountry: string;
    dateOfIssue: Date;
    dateOfExpiry: Date;
    constructor(type: DocumentType, number: string, issuingCountry: string, dateOfIssue: Date, dateOfExpiry: Date);
}
declare class Contact {
    phoneNumber?: string;
    email?: string;
    constructor(phoneNumber?: string, email?: string);
}
export declare class Passenger {
    readonly ptc: PaxCategory;
    readonly personalInfo: PersonalInfo;
    readonly identityDocument: IdentityDocument;
    contacts: Contact;
    loyaltyInfo?: {};
    constructor(ptc: PaxCategory, personalInfo: {
        firstName: string;
        lastName: string;
        middleName?: string;
        gender: "M" | "F";
        dob: Date;
    }, identityDocument: {
        type: DocumentType;
        number: string;
        issuingCountry: string;
        dateOfIssue: Date;
        dateOfExpiry: Date;
    }, contacts: {
        phoneNumber?: string;
        email?: string;
    }, loyaltyInfo?: {});
}
export {};
