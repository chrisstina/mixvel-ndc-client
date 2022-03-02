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
import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {BookProps, Passenger} from "../../../../core/request/parameters/Book";
import {Offer} from "../../../../core/request/parameters/Price";
import {DocumentType, PaxCategory} from "../../../../core/request/types";
import {SupportedDocumentTypes} from "../../mappers/dictionary/documentType";

class MixvelContact {
    @IsOptional()
    @IsString() //@todo regexp?
    public phoneNumber?: string
    @IsEmail({}, {message: 'Mixvel requires at least one valid email'})
    public email: string

    constructor(phoneNumber: string, email: string) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class MixvelIdentityDocument {
    @IsIn(Object.keys(SupportedDocumentTypes), {message: `Mixvel supports only following document types: ${Object.keys(SupportedDocumentTypes)}`})
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

class MixvelPersonalInfo {
    @IsAlpha()
    public firstName: string
    @IsAlpha()
    public lastName: string
    @IsAlpha()
    public middleName: string
    @IsIn(["M", "F"])
    public gender: "M" | "F"
    @IsDate()
    @MaxDate(new Date())
    public dob: Date

    constructor(firstName: string, lastName: string, gender: "M" | "F", dob: Date, middleName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
    }
}

export class MixvelPassenger extends Passenger {
    @ValidateNested()
    public contacts: MixvelContact

    constructor(ptc: PaxCategory,
                personalInfo: { firstName: string; lastName: string; middleName?: string; gender: "M" | "F"; dob: Date },
                identityDocument: { type: DocumentType; number: string; issuingCountry: string; dateOfIssue: Date; dateOfExpiry: Date },
                contacts: { phoneNumber?: string; email?: string },
                loyaltyInfo?: Record<string, unknown>,
                id?: string) {
        super(ptc, personalInfo, identityDocument, contacts, loyaltyInfo, id);
        this.personalInfo = new MixvelPersonalInfo(
            personalInfo.firstName,
            personalInfo.lastName,
            personalInfo.gender,
            personalInfo.dob,
            personalInfo.middleName || '',
        );
        this.identityDocument = new MixvelIdentityDocument(
            identityDocument.type,
            identityDocument.number,
            identityDocument.issuingCountry,
            identityDocument.dateOfIssue,
            identityDocument.dateOfExpiry);
        this.contacts = new MixvelContact(contacts.phoneNumber || '', contacts.email || '');
    }
}

export class MixvelBookParams extends AbstractRequestParams {
    @ValidateNested({each: true})
    public offer: Offer
    @IsArray()
    @ValidateNested({each: true})
    public passengers: Array<MixvelPassenger>

    private constructor(props: BookProps) {
        super()
        this.offer = new Offer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner, props.offer.responseId)
        this.passengers = props.passengers.map(passenger => new MixvelPassenger(
            passenger.ptc,
            passenger.personalInfo,
            passenger.identityDocument,
            passenger.contacts,
            passenger.loyaltyInfo,
            passenger.id
        ))
    }
}