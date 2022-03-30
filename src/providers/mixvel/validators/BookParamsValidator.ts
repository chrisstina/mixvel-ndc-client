import assert from "assert";
import {AbstractParamsValidator} from "../../../core/request/AbstractParamsValidator";
import {MixvelBookParams} from "../request/parameters/Book";

export const SUPPORTED_DOCTYPES = ["REGULAR_PASSPORT", "BIRTHDAY_CERTIFICATE"]

export class BookParamsValidator extends AbstractParamsValidator {
    public static validate(params: MixvelBookParams): null | string {
        const paramsOrError = MixvelBookParams.create<MixvelBookParams>(params)
        if (paramsOrError.isFailure) {
            return paramsOrError.error || 'Generic parameter validation error'
        }

        const {passengers, offer} = params
        try {
            passengers.forEach((passenger) => { // every passenger has to have an offer
                assert(offer.offerItems.findIndex(({ptc}) => ptc === passenger.ptc) !== -1, `No offer found for ${passenger.ptc}`)
            })
        } catch (e) {
            if (e instanceof Error) {
                return e.message || 'Generic parameter validation error'
            }
        }
        return null
    }
}