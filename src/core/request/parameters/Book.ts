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
  Validate,
  ValidateNested,
} from "class-validator";

import { IsPersonName } from "../../validators/IsPersonName";
import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { DocumentType, PaxCategory } from "../types";
import { Offer } from "./Price";
import { FormOfPayment } from "./TicketIssue";
import { Result } from "../../Result";

export const SUPPORTED_DOCTYPES = [
  "REGULAR_PASSPORT_RU",
  "BIRTHDAY_CERTIFICATE",
  "INTERNATIONAL_PASSPORT_RU",
  "NATIONAL_PASSPORT",
  "OFFICER_ID",
  "TEMPORARY_ID",
  "MILITARY_ID",
  "RESIDENCE",
  "SEAMAN_ID",
  "RETURN_ID",
];

export type BookProps = RequestProps<BookParams>;

export class BookParams extends AbstractRequestParams {
  public offer: Offer;
  @IsArray()
  @ValidateNested({ each: true })
  public passengers: Array<Passenger>;
  @ValidateNested()
  @IsOptional()
  formOfPayment?: FormOfPayment;
  @IsOptional()
  agencyContacts?: { phone: string; email: string };

  private constructor(props: BookProps) {
    super();
    this.offer = new Offer(
      props.offer.offerId,
      props.offer.offerItems,
      props.offer.offerOwner,
      props.offer.responseId
    );
    this.passengers = props.passengers.map(
      (passenger) =>
        new Passenger(
          passenger.ptc,
          passenger.personalInfo,
          passenger.identityDocument,
          passenger.contacts,
          passenger.loyaltyInfo,
          passenger.ancillaries,
          passenger.id,
          passenger.osiRemarks,
          passenger.ssrRemarks,
          passenger.subsidyData
        )
    );
    if (props.formOfPayment) {
      this.formOfPayment = new FormOfPayment(
        props.formOfPayment.type,
        props.formOfPayment.data
      );
    }
    if (props.agencyContacts) {
      this.agencyContacts = {
        phone: props.agencyContacts.phone,
        email: props.agencyContacts.email,
      };
    }
  }

  public static create(props: BookProps): Result<BookParams> {
    const params = new BookParams(props);
    return AbstractRequestParams.validate<BookParams>(params);
  }
}

export class PersonalInfo {
  @IsNotEmpty()
  @Validate(IsPersonName, [true])
  public firstName: string;
  @IsNotEmpty()
  @Validate(IsPersonName, [true])
  @IsNotEmpty()
  public lastName: string;
  @Validate(IsPersonName, [true])
  @IsOptional()
  public middleName?: string;
  @IsIn(["M", "F"])
  public gender: "M" | "F";
  @IsDate()
  @MaxDate(new Date())
  public dob: Date;

  constructor(
    firstName: string,
    lastName: string,
    gender: "M" | "F",
    dob: Date,
    middleName?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.gender = gender;
    this.dob = dob;
  }
}

class IdentityDocument {
  @IsIn(SUPPORTED_DOCTYPES)
  public type: DocumentType;
  @IsNotEmpty({ message: "Document number should not be empty" })
  public number: string;
  @IsAlpha()
  @Length(2, 2)
  public issuingCountry: string;
  @IsDate()
  @MaxDate(new Date())
  public dateOfIssue: Date;
  @IsDate()
  @MinDate(new Date())
  public dateOfExpiry: Date;

  constructor(
    type: DocumentType,
    number: string,
    issuingCountry: string,
    dateOfIssue: Date,
    dateOfExpiry: Date
  ) {
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
  public phoneNumber?: string;
  @IsOptional()
  @IsEmail()
  public email?: string;

  constructor(phoneNumber?: string, email?: string) {
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

export type OSIRemark = string;

export type SSRRemark = {
  type: string;
  text: string;
  action?: "add" | "delete";
  paxs?: string[];
  segments?: string[];
};

export type SubsidyData = { program?: string; type?: string };

export type LoyaltyInfo = {
  code?: string;
  carrier?: string;
  opts?: Record<string, any>;
};

export class Passenger {
  @IsIn([
    "ADULT",
    "CHILD",
    "INFANT",
    "WSEATINFANT",
    "YOUTH",
    "SENIOR",
    "DISABLED",
    "DISABLEDCHILD",
    "ESCORT",
    "LARGEFAMILY",
    "STATERESIDENT",
  ])
  public readonly ptc: PaxCategory;
  @ValidateNested()
  public personalInfo: PersonalInfo;
  @ValidateNested()
  public identityDocument: IdentityDocument;
  @ValidateNested()
  public contacts: Contact;
  public loyaltyInfo?: LoyaltyInfo;
  public ancillaries?: Array<Offer>;

  constructor(
    ptc: PaxCategory,
    personalInfo: {
      firstName: string;
      lastName: string;
      middleName?: string;
      gender: "M" | "F";
      dob: Date;
    },
    identityDocument: {
      type: DocumentType;
      number: string;
      issuingCountry: string;
      dateOfIssue: Date;
      dateOfExpiry: Date;
    },
    contacts: { phoneNumber?: string; email?: string },
    loyaltyInfo?: LoyaltyInfo,
    ancillaries?: Array<Offer>,
    public readonly id?: string,
    public osiRemarks?: Array<OSIRemark>,
    public ssrRemarks?: Array<SSRRemark>,
    public subsidyData?: SubsidyData
  ) {
    this.ptc = ptc;
    this.personalInfo = new PersonalInfo(
      personalInfo.firstName,
      personalInfo.lastName,
      personalInfo.gender,
      personalInfo.dob,
      personalInfo.middleName
    );
    this.identityDocument = new IdentityDocument(
      identityDocument.type,
      identityDocument.number,
      identityDocument.issuingCountry,
      identityDocument.dateOfIssue,
      identityDocument.dateOfExpiry
    );
    this.contacts = new Contact(contacts.phoneNumber, contacts.email);
    this.loyaltyInfo = loyaltyInfo;
    this.ancillaries = ancillaries;
  }
}
