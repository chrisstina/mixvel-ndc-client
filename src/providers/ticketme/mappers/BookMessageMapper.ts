import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {BookParams, Passenger} from "../../../core/request/parameters/Book";
import {PartyCredentials} from "../TicketMeRequest";
import {IdentityDocument, OrderCreateRQ, Pax, PaxContact} from "../messages/OrderCreateRQ";
import {toTicketMe as toTicketMePTC} from "./dictionary/ptc";
import {toTicketMe as toTicketMeDocument} from "./dictionary/documentType";
import {genderToTitle, toTicketMeDate, toTicketMeGender} from "./commonMappers";

export class BookMessageMapper implements IMessageMapper {
    constructor(public readonly params: BookParams,
        public readonly credentials: PartyCredentials) {
    }

    private static passengerToPax(passenger: Passenger, paxContact: PaxContact) {
        const document: IdentityDocument = {
            IdentityDocumentNumber: [{_: passenger.identityDocument.number}],
            IdentityDocumentType: [{_: toTicketMeDocument(passenger.identityDocument.type)}],
            ExpiryDate: [{_: toTicketMeDate(passenger.identityDocument.dateOfExpiry)}],
            Birthdate: [{_: toTicketMeDate(passenger.personalInfo.dob)}],
            NameTitle: [{_: genderToTitle(passenger.personalInfo.gender)}],
            GivenName: [{_: passenger.personalInfo.firstName}],
            Surname: [{_: passenger.personalInfo.lastName}],
        }

        const pax: Pax = {
            $: {PassengerID: passenger.id || ''},
            PTC: [{_: toTicketMePTC(passenger.ptc)}],
            CitizenshipCountryCode: [{_: passenger.identityDocument.issuingCountry}],
            Individual: [{
                "GivenName": [{_: passenger.personalInfo.firstName}],
                "Surname": [{_: passenger.personalInfo.lastName}],
                "MiddleName": [{_: passenger.personalInfo.middleName || ''}],
                "Birthdate": [{_: toTicketMeDate(passenger.personalInfo.dob)}],
                "Gender": [{_: toTicketMeGender(passenger.personalInfo.gender)}],
            }],
            IdentityDocument: [document],
            ContactInfoRef: [{_: paxContact.$.ContactID}]
        }
        return pax
    }

    private static passengerToContact(passenger: Passenger) {
        const contact: PaxContact = {
            $: {"ContactID": generateContactReference(passenger.id || '')},
            ContactProvided: []
        }
        if (passenger.contacts.phoneNumber) {
            contact.ContactProvided.push({"Phone": [{"PhoneNumber": [{_: passenger.contacts.phoneNumber}]}]})
        }
        if (passenger.contacts.email) {
            contact.ContactProvided.push({"EmailAddress": [{"EmailAddressValue": [{_: passenger.contacts.email}]}]})
        }
        return contact
    }

    map(): OrderCreateRQ {
        const ticketmeRequestMessage = new OrderCreateRQ({
            $: {
                Owner: this.params.offer.offerOwner || '',
                OfferID: this.params.offer.offerId,
                ResponseID: this.params.offer.responseId || ''
            },
            OfferItem: this.params.offer.offerItems.map(item => {
                return {
                    $: {OfferItemID: item.offerItemId},
                    PassengerRefs: {_: item.paxs || ''}
                }
            })
        })
        this.params.passengers.forEach((passenger) => {
            const paxContact = BookMessageMapper.passengerToContact(passenger)
            ticketmeRequestMessage.addPax(
                BookMessageMapper.passengerToPax(passenger, paxContact),
                paxContact)
        })
        ticketmeRequestMessage.addParty(this.credentials)
        return ticketmeRequestMessage
    }
}

function generateContactReference(paxId: string): string {
    return `CTC_${paxId}`
}