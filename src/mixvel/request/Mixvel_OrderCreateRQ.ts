import {GenericNDCMessage} from "./GenericNDCMessage";
import {SelectedOffer} from "./Mixvel_OfferPriceRQ";
import {MixvelDocumentType} from "../constants/documentType";

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

export class Mixvel_OrderCreateRQ implements GenericNDCMessage {
    get endpoint() {
        return 'api/Order/create'
    }

    get xmlns() {
        return {"m:Mixvel_OrderCreateRQ": "https://www.mixvel.com/API/XSD/Mixvel_OrderCreateRQ/1_01"}
    }

    get nodeName() {
        return "m:Mixvel_OrderCreateRQ"
    }

    public CreateOrder: {
        SelectedOffer: SelectedOffer,
        DataLists?: {
            "ContactInfoList": {
                "ContactInfo": Array<ContactInfo>
            },
            "PaxList": {
                "Pax": Array<Pax>
            }
        }
    }

    constructor(offerId: string) {
        this.CreateOrder = {
            SelectedOffer: {
                OfferRefID: offerId,
            },
        }
    }

    addPax(pax: Pax, paxContact: ContactInfo) {
        pax.ContactInfoRefID = paxContact.ContactInfoID

        if (!this.CreateOrder.DataLists) {
            this.CreateOrder.DataLists = {PaxList: {Pax: []}, ContactInfoList: {ContactInfo: []}}
        }

        this.CreateOrder.DataLists.PaxList.Pax.push(pax)
        this.CreateOrder.DataLists.ContactInfoList.ContactInfo.push(paxContact)
    }

    /**
     * @param {string} offerItemId
     * @param {string[]} paxRefs
     */
    addSelectedOfferItem(offerItemId: string, paxRefs: Array<string>) {
        if (!this.CreateOrder.SelectedOffer.SelectedOfferItem) {
            this.CreateOrder.SelectedOffer.SelectedOfferItem = []
        }
        this.CreateOrder.SelectedOffer.SelectedOfferItem.push({OfferItemRefID: offerItemId, PaxRefID: paxRefs})
    }
}