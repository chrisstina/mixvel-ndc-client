import assert from "assert";
import {AbstractParamsValidator} from "./AbstractParamsValidator";
import {BookParams} from "../parameters";

export class BookParamsValidator  extends AbstractParamsValidator {
    public static validate(props: BookParams) : true | never {
        const {passengers, offerItemIds, offerId} = props

        assert(offerId.length > 0)
        assert(offerItemIds.length > 0)
        assert(passengers.length > 0)

        //@todo
        return true
    }
}