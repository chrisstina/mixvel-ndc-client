export declare type Cabin = "ECONOMY" | "BUSINESS";
export declare type PaxCategory = "ADULT" | "CHILD" | "INFANT";
export declare type DocumentType = "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL";
export declare type FopType = "CASH" | "BILL" | "CARD";
export declare class OriginDestination {
    from: string;
    to: string;
    dateRangeStart: string | Date;
    dateRangeEnd: string | Date;
    constructor(from: string, to: string, dateRangeStart: string | Date, dateRangeEnd: string | Date);
}
export declare class AnonymousTraveler {
    id: string;
    ptc: PaxCategory;
    age: string;
    constructor(id: string, ptc: PaxCategory, age: string);
}
export declare type Passenger = {
    ptc: PaxCategory;
    personalInfo: {
        firstName: string;
        lastName: string;
        middleName?: string;
        gender: "M" | "F";
        dob: Date;
    };
    identityDocument: {
        type: DocumentType;
        number: string;
        issuingCountry: string;
        dateOfIssue: Date;
        dateOfExpiry: Date;
    };
    contacts: {
        phoneNumber?: string;
        email?: string;
    };
    loyaltyInfo?: {};
};
