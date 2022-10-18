import {INDCMessage} from "../../../interfaces/INDCMessage";
import {SelectedOffer} from "./Mixvel_OfferPriceRQ";
import {MixvelDocumentType} from "../mappers/dictionary/documentType";
import {AccountableDoc, DirectBill, OtherPaymentMethod} from "./Mixvel_CommonTypes";

type ContactTypeText = "personal"

type Individual = { GenderCode: string, GivenName: string, Birthdate: string, MiddleName?: string, Surname: string }

type OsiRemark = { RemarkText: string }

export class Pax {
    constructor(
        public AgeMeasure: string,
        public ContactInfoRefID: string,
        public IdentityDoc: { ExpiryDate: string, IdentityDocID: string, IssueDate: string, Surname: string, IdentityDocTypeCode: MixvelDocumentType, IssuingCountryCode: string },
        public Individual: Individual,
        public PaxID: string,
        public PTC: string,
        public Remark?: OsiRemark[]
    ) {
    }
}

export class ContactInfo {
    constructor(public ContactInfoID: string,
                public EmailAddress: { ContactTypeText: ContactTypeText, EmailAddressText: string },
                public Phone: { ContactTypeText: ContactTypeText, PhoneNumber: string }
    ) {
    }
}

export class Mixvel_OrderCreateRQ implements INDCMessage {
    get xmlns() {
        return {"xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderCreateRQ/1_01"}
    }

    get nodeName() {
        return "m:Mixvel_OrderCreateRQ"
    }

    public CreateOrder: {
        SelectedOffer: SelectedOffer[],
    }

    public PaymentFunctions?: {
        "PaymentProcessingDetails": {
            "PaymentProcessingDetailsPaymentMethod": OtherPaymentMethod | DirectBill | AccountableDoc
        }
    }

    public DataLists: {
        "ContactInfoList": {
            "ContactInfo": Array<ContactInfo>
        },
        "PaxList": {
            "Pax": Array<Pax>
        }
    }

    constructor() {
        this.CreateOrder = {
            SelectedOffer: [],
        }
        this.DataLists = {ContactInfoList: {ContactInfo: []}, PaxList: {Pax: []}}
    }
}