export type Cabin = "ECONOMY" | "BUSINESS"
export type PaxCategory = "ADULT" | "CHILD" | "INFANT"
export type DocumentType = "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL"
export type FopType = "CASH" | "BILL" | "CARD"

export class OriginDestination {
    constructor(public from: string,
                public to: string,
                public dateRangeStart: string | Date,
                public dateRangeEnd: string | Date
    ) {
    }
}

export class AnonymousTraveler {
    constructor(public id: string,
                public ptc: PaxCategory,
                public age: string) {
    }
}

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