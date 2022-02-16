import {AbstractTicketMeNDCMessage, NodeValue, StringValue} from "./AbstractTicketMeNDCMessage";
import {Offer} from "./OfferPriceRQ";
import {TicketmeDocumentType} from "../mappers/dictionary/documentType";

export type IdentityDocument = {
    "IdentityDocumentNumber": StringValue[],
    "IdentityDocumentType": NodeValue<TicketmeDocumentType>[],
    "ExpiryDate": StringValue[],
    "Birthdate": StringValue[],
    "NameTitle": NodeValue<"Mr" | "Mrs">[],
    "GivenName": StringValue[],
    "Surname": StringValue[]
}

export type Pax = {
    $: { PassengerID: string },
    PTC: StringValue[],
    CitizenshipCountryCode: StringValue[],
    IdentityDocument: IdentityDocument[],
    ContactInfoRef: StringValue[]
}

export type PaxContact = {
    "$": { "ContactID": string },
    "ContactProvided": Array<{ "EmailAddress": { "EmailAddressValue": StringValue[] }[] } | { "Phone": { "PhoneNumber": StringValue[] }[] }>
}

export class OrderCreateRQ extends AbstractTicketMeNDCMessage {
    public Query: {
        Order: { Offer: Offer[] }[],
        DataLists: {
            PassengerList: {
                Passenger: Pax[]
            }[],
            ContactList: {
                ContactInformation: PaxContact[]
            }[]
        }[],
        Metadata?: []
    }[]

    constructor(offer: Offer) {
        super();
        this.Query = [{
            Order: [{Offer: [offer]}],
            DataLists: [
                {
                    PassengerList: [{
                        Passenger: []
                    }],
                    ContactList: [{
                        ContactInformation: []
                    }]
                }
            ]
        }]
    }

    get nodeName() {
        return "OrderCreateRQ"
    }

    addPax(pax: Pax, paxContact: PaxContact) {
        this.Query[0].DataLists[0].PassengerList[0].Passenger.push(pax)
        this.Query[0].DataLists[0].ContactList[0].ContactInformation.push(paxContact)
    }
}