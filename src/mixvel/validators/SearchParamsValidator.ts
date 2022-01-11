import assert from "assert";
import {AbstractParamsValidator} from "../../request/validators/AbstractParamsValidator";
import {SearchParams} from "../../request/parameters";

export class SearchParamsValidator extends AbstractParamsValidator {
    public static validate(props: SearchParams): true | never {
        const {originDestinations} = props
        assert(originDestinations.length <= 2) // for test purposes: allow only simple OW and RT routes
        return true
    }
}
