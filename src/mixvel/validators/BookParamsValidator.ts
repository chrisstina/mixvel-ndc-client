import assert from "assert";

import {AbstractParamsValidator} from "../../request/validators/AbstractParamsValidator";
import {BookParams} from "../../request/parameters";

export class BookParamsValidator extends AbstractParamsValidator {
    public static validate(props: BookParams): true | never {
        const {passengers, offerItemIds} = props

        passengers.forEach((passenger, paxId) => {
            // every passenger has to have an offer
            assert(offerItemIds.findIndex(({ptc}) => ptc === passenger.ptc) !== -1, `No offer found for ${passenger.ptc}`)

            // middlename is required
            assert(
                passenger.personalInfo.middleName !== undefined && passenger.personalInfo.middleName.length > 0,
                `Missing middle name for pax #${paxId}`)
        })

        return true
    }
}