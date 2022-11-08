import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {BookProps, OSIRemark, Passenger, SSRRemark, SubsidyData} from "../../../../core/request/parameters/Book";
import {Offer} from "../../../../core/request/parameters/Price";
import {FormOfPayment} from "../../../../core/request/parameters/TicketIssue";
import {DocumentType, PaxCategory} from "../../../../core/request/types";
import {Result} from "../../../../core/Result";

declare class MixvelContact {
    phoneNumber?: string;
    email: string;
    constructor(phoneNumber: string, email: string);
}
declare class MixvelSubsidyInformation {
    program?: string;
    type?: string;
    constructor(program?: string, type?: string);
}
export declare class MixvelPassenger extends Passenger {
    contacts: MixvelContact;
    subsidyData?: MixvelSubsidyInformation;
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
    }, loyaltyInfo?: Record<string, unknown>, ancillaries?: Array<Offer>, id?: string, osiRemarks?: Array<OSIRemark>, ssrRemarks?: Array<SSRRemark>, subsidyData?: SubsidyData);
}
export declare class MixvelBookParams extends AbstractRequestParams {
    offer: Offer;
    passengers: Array<MixvelPassenger>;
    formOfPayment?: FormOfPayment;
    static create(props: BookProps): Result<MixvelBookParams>;
    private constructor();
}
export {};
