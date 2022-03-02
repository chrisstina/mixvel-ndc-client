import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {ContactInfo, Mixvel_OrderCreateRQ, Pax} from "../messages/Mixvel_OrderCreateRQ";

import {toMixvel as toMixvelDocument} from "./dictionary/documentType"
import {toMixvel as toMixvelPTC} from "./dictionary/ptc"
import {toAge, toMixvelDate} from "./commonMappers";
import {MixvelBookParams, MixvelPassenger} from "../request/parameters/Book";

export class BookMessageMapper implements IMessageMapper {
    constructor(public readonly params: MixvelBookParams) {
    }

    private static passengerToPax(passenger: MixvelPassenger, paxId: number) {
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

    private static passengerToContact(passenger: MixvelPassenger, paxId: number) {
        return new ContactInfo(
            generateContactReference(paxId),
            {ContactTypeText: "personal", EmailAddressText: passenger.contacts.email},
            {ContactTypeText: "personal", PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || '')}
        )
    }

    map(): Mixvel_OrderCreateRQ {
        const mixvelRequestMessage = new Mixvel_OrderCreateRQ(this.params.offer.offerId)
        const paxRefs = new Map()
        this.params.passengers.forEach((passenger, idx) => {
            const pax = BookMessageMapper.passengerToPax(passenger, idx + 1)
            paxRefs.set(passenger.ptc, [...paxRefs.get(passenger.ptc) || [], pax.PaxID])
            mixvelRequestMessage.addPax(pax, BookMessageMapper.passengerToContact(passenger, idx + 1))
            // @todo LoyaltyProgramAccount
        })

        this.params.offer.offerItems.forEach(({offerItemId, ptc}) => {
            if (paxRefs.has(ptc)) {
                mixvelRequestMessage.addSelectedOfferItem(offerItemId, paxRefs.get(ptc))
            }
        })
        return mixvelRequestMessage
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