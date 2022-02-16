import assert from "assert";
import {BookParams} from "../../../core/request/parameters/Book";
import {AbstractParamsValidator} from '../../../core/request/AbstractParamsValidator'

export class BookParamsValidator extends AbstractParamsValidator {
    public static validate(params: BookParams): true | never {
        assert(params.offer.offerOwner, 'Missing offer owner')
        assert(params.offer.offerId, 'Missing offer id')
        assert(params.offer.responseId, 'Missing response id')
        params.offer.offerItems.forEach(item => {
            assert(item.offerItemId !== undefined, 'Missing offer item id')
            assert(item.paxs !== undefined, 'Missing offer item paxs')
        })

        params.passengers.forEach(passenger => {
            assert(passenger.id !== undefined, 'Missing passenger id')

            // every passenger has to have an offer
            assert(params.offer.offerItems.findIndex(({paxs}) => paxs?.split(' ').includes(passenger.id || '')) !== -1, `No offer found for passenger ${passenger.id}`)
        })
        return true
    }
}