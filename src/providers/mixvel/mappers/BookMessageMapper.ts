import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {ContactInfo, Mixvel_OrderCreateRQ, Pax} from "../messages/Mixvel_OrderCreateRQ";
import {MixvelBookParams, MixvelPassenger} from "../request/parameters/Book";
import {toMixvel as toMixvelDocument} from "./dictionary/documentType"
import {toMixvel as toMixvelPTC} from "./dictionary/ptc"
import {toAge, toMixvelDate} from "./commonMappers";

export class BookMessageMapper implements IMessageMapper {
    message: Mixvel_OrderCreateRQ

    constructor(public readonly params: MixvelBookParams) {
        this.message = new Mixvel_OrderCreateRQ(this.params.offer.offerId)
    }

    map(): Mixvel_OrderCreateRQ {
        const paxRefs = new Map()
        this.params.passengers.forEach((passenger, idx) => {
            const pax = this.passengerToPax(passenger, idx + 1)
            paxRefs.set(passenger.ptc, [...paxRefs.get(passenger.ptc) || [], pax.PaxID])
            this.addPax(pax, this.passengerToContact(passenger, idx + 1))
            // @todo LoyaltyProgramAccount
        })

        this.params.offer.offerItems.forEach(({offerItemId, ptc}) => {
            if (paxRefs.has(ptc)) {
                this.addSelectedOfferItem(offerItemId, paxRefs.get(ptc))
            }
        })
        return this.message
    }

    private passengerToPax(passenger: MixvelPassenger, paxId: number) {
        const pax = new Pax(
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
                MiddleName: passenger.personalInfo.middleName || undefined,
                Surname: passenger.personalInfo.lastName,
            },
            generatePaxReference(paxId),
            toMixvelPTC(passenger.ptc)
        )
        if (! pax.Individual.MiddleName) { // mind the nodes order
            delete pax.Individual.MiddleName
        }
        return pax
    }

    private passengerToContact(passenger: MixvelPassenger, paxId: number) {
        return new ContactInfo(
            generateContactReference(paxId),
            {ContactTypeText: "personal", EmailAddressText: passenger.contacts.email},
            {ContactTypeText: "personal", PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || '')}
        )
    }

    private addPax(pax: Pax, paxContact: ContactInfo) {
        pax.ContactInfoRefID = paxContact.ContactInfoID
        this.message.DataLists.PaxList.Pax.push(pax)
        this.message.DataLists.ContactInfoList.ContactInfo.push(paxContact)
    }

    /**
     * @param {string} offerItemId
     * @param {string[]} paxRefs
     */
    private addSelectedOfferItem(offerItemId: string, paxRefs: Array<string>) {
        if (!this.message.CreateOrder.SelectedOffer.SelectedOfferItem) {
            this.message.CreateOrder.SelectedOffer.SelectedOfferItem = []
        }
        this.message.CreateOrder.SelectedOffer.SelectedOfferItem.push({OfferItemRefID: offerItemId, PaxRefID: paxRefs})
    }
}

function generatePaxReference(paxId: number): string {
    return `Pax_${paxId}`
}

function generateContactReference(paxId: number): string {
    return `PaxContact_${paxId}`
}

/**
 * Phone has to contain '+' sign
 * @param phone
 */
function prepPhoneNumber(phone: string) {
    return [phone.indexOf('+') !== -1 ? '' : '+', phone].join('')
}