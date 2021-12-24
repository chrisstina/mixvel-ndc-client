import assert from "assert";

import {MixvelMessageMapper} from "./MixvelMessageMapper";
import {BookParams, Passenger} from "../../request-params/BookParams";
import {ContactInfo, Mixvel_OrderCreateRQ, Pax} from "../request/Mixvel_OrderCreateRQ";

import {toMixvel as toMixvelDocument} from "./dictionary/documentType"
import {toMixvel as toMixvelPTC} from "./dictionary/ptc"
import {toAge, toMixvelDate} from "./commonMappers";

export class BookMessageMapper implements MixvelMessageMapper {
    constructor(public readonly params: BookParams) {
    }

    // @todo validate
    map(): Mixvel_OrderCreateRQ {
        const mixvelRequestMessage = new Mixvel_OrderCreateRQ(this.params.offerId)
        const paxRefs = new Map()
        this.params.passengers.forEach((passenger, idx) => {
            const pax = BookMessageMapper.passengerToPax(passenger, idx + 1)
            paxRefs.set(passenger.ptc, [...paxRefs.get(passenger.ptc) || [], pax.PaxID])
            mixvelRequestMessage.addPax(pax, this.passengerToContact(passenger, idx + 1))
            // @todo LoyaltyProgramAccount
        })

        this.params.offerItemIds.forEach(({id, ptc}) => {
            if (paxRefs.has(ptc)) {
                mixvelRequestMessage.addSelectedOfferItem(id, paxRefs.get(ptc))
            }
        })
        return mixvelRequestMessage
    }

    private static passengerToPax(passenger: Passenger, paxId: number) {
        assert( //@todo move to params validation
            passenger.personalInfo.middleName !== undefined && passenger.personalInfo.middleName.length > 0,
            `Missing middle name for pax #${paxId}`)

        return new Pax(
            toAge(passenger.personalInfo.dob),
            '',
            {
                IdentityDocID: passenger.identityDocument.number,
                IdentityDocTypeCode: toMixvelDocument(passenger.identityDocument.type),
                ExpiryDate: toMixvelDate(passenger.identityDocument.dateOfExpiry),
                IssueDate: toMixvelDate(passenger.identityDocument.dateOfIssue),
                IssuingCountryCode: passenger.identityDocument.issuingCountry,
                Surname: passenger.personalInfo.lastName
            },
            {
                GenderCode: passenger.personalInfo.gender,
                GivenName: passenger.personalInfo.firstName,
                MiddleName: passenger.personalInfo.middleName,
                Surname: passenger.personalInfo.lastName,
                Birthdate: toMixvelDate(passenger.personalInfo.dob)
            },
            generatePaxReference(paxId),
            toMixvelPTC(passenger.ptc)
        )
    }

    private passengerToContact(passenger: Passenger, paxId: number) {
        const email = passenger.contacts.email || this.firstAvailableEmail()
        assert(email !== undefined, `Missing email for pax #${paxId}`) //@todo move to params validation
        assert(passenger.contacts.phoneNumber !== undefined, `Missing phone number for pax #${paxId}`) //@todo move to params validation and check for infant

        return new ContactInfo(
            generateContactReference(paxId),
            {EmailAddressText: email, ContactTypeText: "personal"},
            {PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber), ContactTypeText: "personal"}
        )
    }

    private firstAvailableEmail(): string | undefined {
        for (const passengersKey in this.params.passengers) {
            if (this.params.passengers[passengersKey].contacts.email !== undefined) {
                return this.params.passengers[passengersKey].contacts.email
            }
        }
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