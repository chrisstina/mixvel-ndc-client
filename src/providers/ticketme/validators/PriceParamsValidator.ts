import assert from "assert";
import {AbstractParamsValidator} from '../../../core/request/AbstractParamsValidator'
import {PriceParams} from "../../../core/request/parameters/Price";

export class PriceParamsValidator extends AbstractParamsValidator {
    public static validate(params: PriceParams): true | never {
        params.offers.map(offer => {
            assert(offer.offerOwner, 'Missing offer owner')
            assert(offer.offerId, 'Missing offer id')
            assert(offer.responseId, 'Missing response id')
            offer.offerItems.forEach(item => {
                assert(item.offerItemId !== undefined, 'Missing offer item id')
                assert(item.paxs !== undefined, 'Missing offer item paxs')
            })
        })
        return true
    }
}