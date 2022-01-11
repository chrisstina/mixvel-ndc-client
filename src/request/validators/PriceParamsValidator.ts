import {AbstractParamsValidator} from "./AbstractParamsValidator";
import {PriceParams} from "../parameters";

export class PriceParamsValidator extends AbstractParamsValidator {
    public static validate(props: PriceParams) : true | never {
        const {offerId, offerItemIds} = props
        //@todo
        return true
    }
}