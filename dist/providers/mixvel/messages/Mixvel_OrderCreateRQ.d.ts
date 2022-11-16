import {INDCMessage} from "../../../interfaces/INDCMessage";
import {SelectedOffer} from "./Mixvel_OfferPriceRQ";
import {MixvelDocumentType} from "../mappers/dictionary/documentType";
import {AccountableDoc, DirectBill, OtherPaymentMethod} from "./Mixvel_CommonTypes";

declare type ContactTypeText = "personal";
declare type Individual = {
    GenderCode: string;
    GivenName: string;
    Birthdate: string;
    MiddleName?: string;
    Surname: string;
};
declare type OsiRemark = {
    RemarkText: string;
};
declare type SubsidyInformation = {
    SubsidyProgram?: string;
    SubsidyType?: string;
};
declare type LoyaltyProgramAccount = {
    AccountNumber: string;
    LoyaltyProgram: {
        Carrier: {
            AirlineDesigCode: string;
        };
    };
    PaxSegmentRefID?: string[];
};
export declare class Pax {
    AgeMeasure: string;
    ContactInfoRefID: string;
    IdentityDoc: {
        ExpiryDate: string;
        IdentityDocID: string;
        IssueDate: string;
        Surname: string;
        IdentityDocTypeCode: MixvelDocumentType;
        IssuingCountryCode: string;
    };
    Individual: Individual;
    LoyaltyProgramAccount?: LoyaltyProgramAccount;
    PaxID: string;
    PTC: string;
    Remark?: OsiRemark[];
    SubsidyInformation?: SubsidyInformation;
    constructor(AgeMeasure: string, ContactInfoRefID: string, IdentityDoc: {
        ExpiryDate: string;
        IdentityDocID: string;
        IssueDate: string;
        Surname: string;
        IdentityDocTypeCode: MixvelDocumentType;
        IssuingCountryCode: string;
    }, Individual: Individual, PaxID: string, PTC: string, Remark?: OsiRemark[], SubsidyInformation?: SubsidyInformation, LoyaltyProgramAccount?: LoyaltyProgramAccount);
}
export declare class ContactInfo {
    ContactInfoID: string;
    EmailAddress: {
        ContactTypeText: ContactTypeText;
        EmailAddressText: string;
    };
    Phone: {
        ContactTypeText: ContactTypeText;
        PhoneNumber: string;
    };
    constructor(ContactInfoID: string, EmailAddress: {
        ContactTypeText: ContactTypeText;
        EmailAddressText: string;
    }, Phone: {
        ContactTypeText: ContactTypeText;
        PhoneNumber: string;
    });
}
export declare class PaxSegmentRemark {
    PaxSegmentRefID?: string | undefined;
    PaxRefID?: string | undefined;
    Type?: string | undefined;
    Text?: string | undefined;
    ActionType?: "add" | "delete" | undefined;
    constructor(PaxSegmentRefID?: string | undefined, PaxRefID?: string | undefined, Type?: string | undefined, Text?: string | undefined, ActionType?: "add" | "delete" | undefined);
}
export declare class Mixvel_OrderCreateRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    CreateOrder: {
        SelectedOffer: SelectedOffer[];
    };
    PaymentFunctions?: {
        "PaymentProcessingDetails": {
            "PaymentProcessingDetailsPaymentMethod": OtherPaymentMethod | DirectBill | AccountableDoc;
        };
    };
    DataLists: {
        "ContactInfoList": {
            "ContactInfo": Array<ContactInfo>;
        };
        "PaxList": {
            "Pax": Array<Pax>;
        };
        PaxSegmentRemarkList?: {
            PaxSegmentRemark: Array<PaxSegmentRemark>;
        };
    };
    constructor();
}
export {};
