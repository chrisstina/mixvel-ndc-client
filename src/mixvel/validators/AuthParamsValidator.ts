import {AbstractParamsValidator} from "../../request/validators/AbstractParamsValidator";
import {AuthParams} from "../../request/parameters";
import assert from "assert";

export class AuthParamsValidator extends AbstractParamsValidator {
    public static validate(params: AuthParams): true | never {
        // assert(params.login && params.login.length > 0, 'Missing login')
        // assert(params.password && params.password.length > 0, 'Missing password')
        // assert(params.structureId && params.structureId.length > 0, 'Missing structure id')
        return true
    }
}