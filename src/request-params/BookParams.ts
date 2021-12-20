import {GenericRequestParams} from "./GenericRequestParams";
import {DocumentType, PaxCategory} from "./dictionary/types";

export type Passenger = {
    ptc: PaxCategory,
    personalInfo: {
        firstName: string,
        lastName: string,
        middleName?: string,
        gender: "M" | "F"
        dob: Date,
    }, identityDocument: {
        type: DocumentType,
        number: string,
        issuingCountry: string,
        dateOfIssue: Date,
        dateOfExpiry: Date,
    }, contacts: {
        phoneNumber?: string,
        email?: string
    }, loyaltyInfo?: {}
}

export class BookParams implements GenericRequestParams {
    /**
     * @param offerId
     * @param {Map<PaxCategory, Array<string>>} offerItemIds
     * @param passengers
     */
    constructor(public readonly offerId: string,
                public readonly offerItemIds: Array<{ id: string, ptc: PaxCategory }>,
                public readonly passengers: Array<Passenger>) {
    }
}