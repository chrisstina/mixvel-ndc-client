import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {DocumentType, PaxCategory} from "../types";
import {Offer} from "./Price";
import {FormOfPayment} from "./TicketIssue";

export declare const SUPPORTED_DOCTYPES: string[];
export declare type BookProps = RequestProps<BookParams>;
export declare class BookParams extends AbstractRequestParams {
    offer: Offer;
    passengers: Array<Passenger>;
    formOfPayment?: FormOfPayment;
    private constructor();
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
export declare type OSIRemark = string;
export declare type SSRRemark = {
    type: string;
    text: string;
    action?: "add" | "delete";
    paxs?: string[];
    segments?: string[];
};
export declare type SubsidyData = {
    program?: string;
    type?: string;
};
export declare class Passenger {
    readonly id?: string | undefined;
    osiRemarks?: string[] | undefined;
    ssrRemarks?: SSRRemark[] | undefined;
    subsidyData?: SubsidyData | undefined;
    readonly ptc: PaxCategory;
    personalInfo: PersonalInfo;
    identityDocument: IdentityDocument;
    contacts: Contact;
    loyaltyInfo?: Record<string, unknown>;
    ancillaries?: Array<Offer>;
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
    }, loyaltyInfo?: Record<string, unknown>, ancillaries?: Array<Offer>, id?: string | undefined, osiRemarks?: string[] | undefined, ssrRemarks?: SSRRemark[] | undefined, subsidyData?: SubsidyData | undefined);
}
export {};
