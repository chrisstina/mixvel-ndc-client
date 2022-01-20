import {
    IsAlpha,
    IsAlphanumeric,
    IsArray,
    IsDate,
    IsEmail,
    IsIn,
    IsOptional,
    IsString,
    Length,
    MaxDate,
    MinDate,
    ValidateNested
} from "class-validator";

import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";
import {DocumentType, PaxCategory} from "../types";

const validationService = new RequestValidationService()

export type BookProps = {
    offerId: string,
    offerItemIds: Array<{ id: string, ptc: PaxCategory }>,
    passengers: Array<Passenger>
}

export class BookParams {
    @IsString()
    public readonly offerId: string
    @IsArray()
    @ValidateNested({each: true})
    public readonly offerItemIds: Array<OfferItem>
    @IsArray()
    @ValidateNested({each: true})
    public readonly passengers: Array<Passenger>

    private constructor(props: BookProps) {
        this.offerId = props.offerId
        this.offerItemIds = props.offerItemIds
        this.passengers = props.passengers.map(passenger => new Passenger(
            passenger.ptc,
            passenger.personalInfo,
            passenger.identityDocument,
            passenger.contacts,
            passenger.loyaltyInfo
        ))
    }

    public static create(props: BookProps): Result<BookParams> {
        const params = new BookParams(props)
        const validationErrors = validationService.getValidator<BookParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<BookParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<BookParams>(params)
    }
}

class OfferItem {
    @IsString()
    id: string
    @IsIn(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ptc: PaxCategory

    constructor(id: string, ptc: PaxCategory) {
        this.id = id;
        this.ptc = ptc;
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
    @IsIn(["PASSPORT", "BIRTHDAY_CERTIFICATE", "INTERNATIONAL"])
    public type: DocumentType
    @IsAlphanumeric()
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

class Passenger {
    @IsIn(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    public readonly ptc: PaxCategory
    @ValidateNested()
    public readonly personalInfo: PersonalInfo
    @ValidateNested()
    public readonly identityDocument: IdentityDocument
    public contacts: Contact
    public loyaltyInfo?: {}

    constructor(ptc: PaxCategory,
                personalInfo: { firstName: string; lastName: string; middleName?: string; gender: "M" | "F"; dob: Date },
                identityDocument: { type: DocumentType; number: string; issuingCountry: string; dateOfIssue: Date; dateOfExpiry: Date },
                contacts: { phoneNumber?: string; email?: string }, loyaltyInfo?: {}) {
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