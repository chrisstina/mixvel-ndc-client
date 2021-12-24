import { GenericRequestParams } from "./GenericRequestParams";
import { DocumentType, PaxCategory } from "./dictionary/types";
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
export declare class BookParams implements GenericRequestParams {
    readonly offerId: string;
    readonly offerItemIds: Array<{
        id: string;
        ptc: PaxCategory;
    }>;
    readonly passengers: Array<Passenger>;
    /**
     * @param offerId
     * @param {Map<PaxCategory, Array<string>>} offerItemIds
     * @param passengers
     */
    constructor(offerId: string, offerItemIds: Array<{
        id: string;
        ptc: PaxCategory;
    }>, passengers: Array<Passenger>);
}
