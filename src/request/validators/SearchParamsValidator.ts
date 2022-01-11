import assert from "assert";
import {SearchParams} from "../parameters";
import {AbstractParamsValidator} from "./AbstractParamsValidator";

export class SearchParamsValidator  extends AbstractParamsValidator {
    public static validate(props: SearchParams) : true | never {
        const {originDestinations, travelers, cabin, preferredCarriers} = props

        assert(originDestinations.length > 0)
        assert(travelers.length > 0)
        //@todo
        return true
    }
}