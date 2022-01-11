import assert from "assert";
import {AuthParams} from "../parameters";
import {AbstractParamsValidator} from "./AbstractParamsValidator";

export class AuthParamsValidator extends AbstractParamsValidator {
    public static validate(props: AuthParams) : true | never {
        const {login, password, structureId} = props

        assert(login.length > 0)
        assert(password.length > 0)
        //@todo
        return true
    }
}