import {AbstractParamsValidator} from '../../../core/request/AbstractParamsValidator'
import {PriceParams} from "../../../core/request/parameters/Price";
import {TicketMePriceParams} from "../request/parameters/Price";

export class PriceParamsValidator extends AbstractParamsValidator {
    public static validate(params: PriceParams): null | string {
        const paramsOrError = TicketMePriceParams.create(params)
        if (paramsOrError.isFailure) {
            return paramsOrError.error || 'Generic parameter validation error'
        }
        return null
    }
}