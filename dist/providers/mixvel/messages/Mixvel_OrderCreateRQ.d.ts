import { INDCMessage } from "../../../interfaces/INDCMessage";
import { SelectedOffer } from "./Mixvel_OfferPriceRQ";
import { MixvelDocumentType } from "../mappers/dictionary/documentType";
import { AccountableDoc, DirectBill, OtherPaymentMethod } from "./Mixvel_CommonTypes";
declare type ContactTypeText = "personal";
declare type Individual = {
    GenderCode: string;
    GivenName: string;
    Birthdate: string;
    MiddleName?: string;
    Surname: string;
};
declare type Remark = {
    Type: "osi" | "ssr";
    RemarkText: string;
    OfferRefID: string;
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
    OfferRefID?: string[];
    PaxRefID?: string[];
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
    PaxID: string;
    PTC: string;
    SubsidyInformation?: SubsidyInformation;
    constructor(AgeMeasure: string, ContactInfoRefID: string, IdentityDoc: {
        ExpiryDate: string;
        IdentityDocID: string;
        IssueDate: string;
        Surname: string;
        IdentityDocTypeCode: MixvelDocumentType;
        IssuingCountryCode: string;
    }, Individual: Individual, PaxID: string, PTC: string, SubsidyInformation?: SubsidyInformation);
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
export declare class Mixvel_OrderCreateRQ implements INDCMessage {
    CreateOrder: {
        SelectedOffer: SelectedOffer[];
    };
    PaymentFunctions?: {
        PaymentProcessingDetails: {
            PaymentProcessingDetailsPaymentMethod: OtherPaymentMethod | DirectBill | AccountableDoc;
        };
    };
    DataLists: {
        ContactInfoList: {
            ContactInfo: Array<ContactInfo>;
        };
        LoyaltyProgramList?: {
            LoyaltyProgramAccount: Array<LoyaltyProgramAccount>;
        };
        PaxList: {
            Pax: Array<Pax>;
        };
        RemarkList?: {
            Remark: Array<Remark>;
        };
    };
    constructor();
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
}
export {};
