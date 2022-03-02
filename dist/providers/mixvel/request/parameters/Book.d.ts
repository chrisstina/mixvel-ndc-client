import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { Passenger } from "../../../../core/request/parameters/Book";
import { Offer } from "../../../../core/request/parameters/Price";
import { DocumentType, PaxCategory } from "../../../../core/request/types";
declare class MixvelContact {
    phoneNumber?: string;
    email: string;
    constructor(phoneNumber: string, email: string);
}
export declare class MixvelPassenger extends Passenger {
    contacts: MixvelContact;
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
    }, loyaltyInfo?: Record<string, unknown>, id?: string);
}
export declare class MixvelBookParams extends AbstractRequestParams {
    offer: Offer;
    passengers: Array<MixvelPassenger>;
    private constructor();
}
export {};
