import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {BookParams, Passenger} from "../../../core/request/parameters/Book";
import {FirstAvailableEmailService} from "../../../services/FirstAvailableEmailService";

import {ContactInfo, Mixvel_OrderCreateRQ, Pax} from "../messages/Mixvel_OrderCreateRQ";

import {toMixvel as toMixvelDocument} from "./dictionary/documentType"
import {toMixvel as toMixvelPTC} from "./dictionary/ptc"
import {toAge, toMixvelDate} from "./commonMappers";

export class BookMessageMapper implements IMessageMapper {
    constructor(public readonly params: BookParams) {
    }

    map(): Mixvel_OrderCreateRQ {
        const mixvelRequestMessage = new Mixvel_OrderCreateRQ(this.params.offer.offerId)
        const paxRefs = new Map()
        this.params.passengers.forEach((passenger, idx) => {
            const pax = BookMessageMapper.passengerToPax(passenger, idx + 1)
            paxRefs.set(passenger.ptc, [...paxRefs.get(passenger.ptc) || [], pax.PaxID])
            mixvelRequestMessage.addPax(pax, this.passengerToContact(passenger, idx + 1))
            // @todo LoyaltyProgramAccount
        })

        this.params.offer.offerItems.forEach(({offerItemId, ptc}) => {
            if (paxRefs.has(ptc)) {
                mixvelRequestMessage.addSelectedOfferItem(offerItemId, paxRefs.get(ptc))
            }
        })
        return mixvelRequestMessage
    }

    private static passengerToPax(passenger: Passenger, paxId: number) {
        return new Pax(
            toAge(passenger.personalInfo.dob),
            '',
            {
                ExpiryDate: toMixvelDate(passenger.identityDocument.dateOfExpiry),
                IdentityDocID: passenger.identityDocument.number,
                IdentityDocTypeCode: toMixvelDocument(passenger.identityDocument.type),
                IssueDate: toMixvelDate(passenger.identityDocument.dateOfIssue),
                IssuingCountryCode: passenger.identityDocument.issuingCountry,
                Surname: passenger.personalInfo.lastName
            },
            {
                Birthdate: toMixvelDate(passenger.personalInfo.dob),
                GenderCode: passenger.personalInfo.gender,
                GivenName: passenger.personalInfo.firstName,
                MiddleName: passenger.personalInfo.middleName || "", // @todo ??
                Surname: passenger.personalInfo.lastName,
            },
            generatePaxReference(paxId),
            toMixvelPTC(passenger.ptc)
        )
    }

    private passengerToContact(passenger: Passenger, paxId: number) {
        const email = passenger.contacts.email || FirstAvailableEmailService.getFirstAvailableEmail(this.params) || ''
        return new ContactInfo(
            generateContactReference(paxId),
            {ContactTypeText: "personal", EmailAddressText: email},
            {ContactTypeText: "personal", PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || '')}
        )
    }
}

function generatePaxReference(paxId: number): string {
    return `Pax_${paxId}`
}

function generateContactReference(paxId: number): string {
    return `Pax_${paxId}`
}

/**
 * Phone has to contain '+' sign
 * @param phone
 */
function prepPhoneNumber(phone: string) {
    return [phone.indexOf('+') !== -1 ? '' : '+', phone].join('')
}