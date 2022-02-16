import assert from "assert";
import {BookParams} from "../../../core/request/parameters/Book";
import {AbstractParamsValidator} from '../../../core/request/AbstractParamsValidator'
import {toMixvel} from "../mappers/dictionary/documentType";
import {FirstAvailableEmailService} from "../../../services/FirstAvailableEmailService";

export class BookParamsValidator extends AbstractParamsValidator {
    public static validate(props: BookParams): true | never {
        const {passengers, offer} = props

        passengers.forEach((passenger, paxId) => {
            // every passenger has to have an offer
            assert(offer.offerItems.findIndex(({ptc}) => ptc === passenger.ptc) !== -1, `No offer found for ${passenger.ptc}`)

            // middlename is required
            assert(
                passenger.personalInfo.middleName !== undefined && passenger.personalInfo.middleName.length > 0,
                `Missing middle name for pax #${paxId}`)

            // document type is supported or throw
            toMixvel(passenger.identityDocument.type)

            // contacts are required
            const email = passenger.contacts.email || FirstAvailableEmailService.getFirstAvailableEmail(props)
            assert(email !== undefined, `Missing email for pax #${paxId}`)
            assert(passenger.contacts.phoneNumber !== undefined, `Missing phone number for pax #${paxId}`)
        })

        return true
    }
}