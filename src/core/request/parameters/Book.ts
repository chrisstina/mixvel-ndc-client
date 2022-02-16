import {
    IsAlpha,
    IsArray,
    IsDate,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MaxDate,
    MinDate,
    ValidateNested
} from "class-validator";

import {AbstractParams} from "./AbstractParams";
import {DocumentType, PaxCategory} from "../types";
import {Offer} from "./Price";

export type BookProps = {
    offer: Offer,
    passengers: Array<Passenger>
}

export class BookParams extends AbstractParams {
    public readonly offer: Offer
    @IsArray()
    @ValidateNested({each: true})
    public readonly passengers: Array<Passenger>

    private constructor(props: BookProps) {
        super()
        this.offer = new Offer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner, props.offer.responseId)
        this.passengers = props.passengers.map(passenger => new Passenger(
            passenger.ptc,
            passenger.personalInfo,
            passenger.identityDocument,
            passenger.contacts,
            passenger.loyaltyInfo
        ))
    }
}

class PersonalInfo {
    @IsAlpha()
    public firstName: string
    @IsAlpha()
    public lastName: string
    @IsAlpha()
    @IsOptional()
    public middleName?: string
    @IsIn(["M", "F"])
    public gender: "M" | "F"
    @IsDate()
    @MaxDate(new Date())
    public dob: Date

    constructor(firstName: string, lastName: string, gender: "M" | "F", dob: Date, middleName?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
    }
}

class IdentityDocument {
    @IsIn(["REGULAR_PASSPORT", "BIRTHDAY_CERTIFICATE", "INTERNATIONAL_PASSPORT"])
    public type: DocumentType
    @IsNotEmpty({message: 'Document number should not be empty'})
    public number: string
    @IsAlpha()
    @Length(2, 2)
    public issuingCountry: string
    @IsDate()
    @MaxDate(new Date())
    public dateOfIssue: Date
    @IsDate()
    @MinDate(new Date())
    public dateOfExpiry: Date

    constructor(type: DocumentType, number: string, issuingCountry: string, dateOfIssue: Date, dateOfExpiry: Date) {
        this.type = type;
        this.number = number;
        this.issuingCountry = issuingCountry;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiry = dateOfExpiry;
    }
}

class Contact {
    @IsOptional()
    @IsString() //@todo regexp?
    public phoneNumber?: string
    @IsOptional()
    @IsEmail()
    public email?: string

    constructor(phoneNumber?: string, email?: string) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

export class Passenger {
    @IsIn(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    public readonly ptc: PaxCategory
    @ValidateNested()
    public readonly personalInfo: PersonalInfo
    @ValidateNested()
    public readonly identityDocument: IdentityDocument
    public contacts: Contact
    public loyaltyInfo?: Record<string, unknown>

    constructor(ptc: PaxCategory,
                personalInfo: { firstName: string; lastName: string; middleName?: string; gender: "M" | "F"; dob: Date },
                identityDocument: { type: DocumentType; number: string; issuingCountry: string; dateOfIssue: Date; dateOfExpiry: Date },
                contacts: { phoneNumber?: string; email?: string }, loyaltyInfo?: Record<string, unknown>,
                public readonly id?: string) {
        this.ptc = ptc;
        this.personalInfo = new PersonalInfo(
            personalInfo.firstName,
            personalInfo.lastName,
            personalInfo.gender,
            personalInfo.dob,
            personalInfo.middleName,
        );
        this.identityDocument = new IdentityDocument(
            identityDocument.type,
            identityDocument.number,
            identityDocument.issuingCountry,
            identityDocument.dateOfIssue,
            identityDocument.dateOfExpiry);
        this.contacts = new Contact(contacts.phoneNumber, contacts.email);
        this.loyaltyInfo = loyaltyInfo;
    }
}