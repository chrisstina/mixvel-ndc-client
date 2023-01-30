import {
    ArrayNotEmpty,
    IsAlpha,
    IsAlphanumeric,
    IsArray,
    IsDate,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxDate,
    MinDate,
    ValidateNested
} from "class-validator";
import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {
    BookProps,
    LoyaltyInfo,
    OSIRemark,
    Passenger,
    SSRRemark,
    SubsidyData,
    SUPPORTED_DOCTYPES
} from "../../../../core/request/parameters/Book";
import {Offer} from "../../../../core/request/parameters/Price";
import {FormOfPayment} from "../../../../core/request/parameters/TicketIssue";
import {DocumentType, PaxCategory} from "../../../../core/request/types";
import {Result} from "../../../../core/Result";

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
    @IsIn(SUPPORTED_DOCTYPES)
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
    @Matches(/[a-zA-Z-\s]/)
    public firstName: string
    @Matches(/[a-zA-Z-\s]/)
    public lastName: string
    @Matches(/[a-zA-Z-\s]/)
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

class MixvelSubsidyInformation {
    @IsOptional()
    public program?: string;
    @IsOptional()
    @IsIn(["LARGE", "ATTENDANT", "INVALID_TEEN", "INVALID_CHILD", "CHILD", "INFANT", "INVALID_23", "INVALID_1", "RESIDENT_DFO", "ELDERLY", "YOUTH", "OCEAN"])
    public type?: string;

    constructor(program?: string, type?: string) {
        this.program = program;
        this.type = type;
    }
}

class MixvelLoyaltyInfo {
    @IsString()
    public code?: string;
    @IsString()
    public carrier?: string;
    @ValidateNested()
    public opts?: MixvelLoyaltyInfoOptions;

    constructor(code?: string, carrier?: string, opts?: Record<string, any>) {
        this.code = code;
        this.carrier = carrier;
        this.opts = new MixvelLoyaltyInfoOptions(opts);
    }
}

class MixvelLoyaltyInfoOptions {
    @IsArray()
    @ArrayNotEmpty()
    public paxRefs: string[] = [];

    constructor(opts?: Record<string, any>) {
        if (opts?.paxRefs) {
            this.paxRefs = opts?.paxRefs;
        }
    }
}

class MixvelSSRRemark {
    @IsOptional()
    @IsIn(["add", "delete"])
    public action?: "add" | "delete";
    @IsOptional()
    @IsAlphanumeric()
    public paxRef?: string;

    constructor(public type: string, public text: string, action?: "add" | "delete", paxRef?: string) {
        this.action = action;
        this.paxRef = paxRef;
    }
}

export class MixvelPassenger extends Passenger {
    @ValidateNested()
    public contacts: MixvelContact
    @ValidateNested()
    public subsidyData?: MixvelSubsidyInformation;
    @ValidateNested()
    public loyaltyInfo?: MixvelLoyaltyInfo;

    constructor(ptc: PaxCategory,
                personalInfo: { firstName: string; lastName: string; middleName?: string; gender: "M" | "F"; dob: Date },
                identityDocument: { type: DocumentType; number: string; issuingCountry: string; dateOfIssue: Date; dateOfExpiry: Date },
                contacts: { phoneNumber?: string; email?: string },
                loyaltyInfo?: LoyaltyInfo,
                ancillaries?: Array<Offer>,
                id?: string,
                osiRemarks?: Array<OSIRemark>,
                ssrRemarks?: Array<SSRRemark>,
                subsidyData?: SubsidyData
    ) {
        super(ptc, personalInfo, identityDocument, contacts, loyaltyInfo, ancillaries, id);
        this.personalInfo = new MixvelPersonalInfo(
            personalInfo.firstName,
            personalInfo.lastName,
            personalInfo.gender,
            personalInfo.dob,
            personalInfo.middleName || undefined,
        );
        this.identityDocument = new MixvelIdentityDocument(
            identityDocument.type,
            identityDocument.number,
            identityDocument.issuingCountry,
            identityDocument.dateOfIssue,
            identityDocument.dateOfExpiry);
        if (loyaltyInfo) {
            this.loyaltyInfo = new MixvelLoyaltyInfo(loyaltyInfo.code, loyaltyInfo.carrier, loyaltyInfo.opts);
        }
        this.contacts = new MixvelContact(contacts.phoneNumber || '', contacts.email || '');
        this.ancillaries = ancillaries;
        this.osiRemarks = osiRemarks;
        if (ssrRemarks) {
            this.ssrRemarks = [];
            ssrRemarks.forEach(remark => {
                this.ssrRemarks?.push(new MixvelSSRRemark(remark.type, remark.text, remark.action, id));
            });
        }
        if (subsidyData) {
            this.subsidyData = new MixvelSubsidyInformation(subsidyData.program, subsidyData.type);
        }
    }
}

export class MixvelBookParams extends AbstractRequestParams {
    @ValidateNested({each: true})
    public offer: Offer
    @IsArray()
    @ValidateNested({each: true})
    public passengers: Array<MixvelPassenger>
    @ValidateNested()
    @IsOptional()
    formOfPayment?: FormOfPayment;

    public static create(props: BookProps): Result<MixvelBookParams> {
        const params = new MixvelBookParams(props);
        return AbstractRequestParams.validate<MixvelBookParams>(params);
    }

    private constructor(props: BookProps) {
        super()
        this.offer = new Offer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner, props.offer.responseId)
        this.passengers = props.passengers.map(passenger => new MixvelPassenger(
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
        ))
        if (props.formOfPayment) {
            this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data);
        }
    }
}
