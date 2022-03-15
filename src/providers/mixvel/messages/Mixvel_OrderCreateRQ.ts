import {INDCMessage} from "../../../interfaces/INDCMessage";
import {SelectedOffer} from "./Mixvel_OfferPriceRQ";
import {MixvelDocumentType} from "../mappers/dictionary/documentType";

type ContactTypeText = "personal"

export class Pax {
    constructor(
        public AgeMeasure: string,
        public ContactInfoRefID: string,
        public IdentityDoc: { ExpiryDate: string; IdentityDocID: string; IssueDate: string; Surname: string; IdentityDocTypeCode: MixvelDocumentType; IssuingCountryCode: string },
        public Individual: { GenderCode: string; GivenName: string; Birthdate: string; MiddleName: string; Surname: string },
        public PaxID: string,
        public PTC: string
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
        SelectedOffer: SelectedOffer,
    }

    public DataLists: {
        "ContactInfoList": {
            "ContactInfo": Array<ContactInfo>
        },
        "PaxList": {
            "Pax": Array<Pax>
        }
    }

    constructor(offerId: string) {
        this.CreateOrder = {
            SelectedOffer: {
                OfferRefID: offerId,
            },
        }
        this.DataLists = {ContactInfoList: {ContactInfo: []}, PaxList: {Pax: []}}
    }
}