import assert from "assert";
import {AbstractParamsValidator} from "../../request/validators/AbstractParamsValidator";
import {SearchProps} from "../../request/parameters/Search";

export class SearchParamsValidator extends AbstractParamsValidator {
    public static validate(props: SearchProps): true | never {
        const {originDestinations} = props
        assert(originDestinations.length <= 2) // for test purposes: allow only simple OW and RT routes
        return true
    }
}
