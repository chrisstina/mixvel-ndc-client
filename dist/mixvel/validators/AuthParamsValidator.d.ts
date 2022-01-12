import { AbstractParamsValidator } from "../../request/validators/AbstractParamsValidator";
import { AuthParams } from "../../request/parameters";
export declare class AuthParamsValidator extends AbstractParamsValidator {
    static validate(params: AuthParams): true | never;
}
