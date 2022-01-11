import { AuthParams } from "../parameters";
import { AbstractParamsValidator } from "./AbstractParamsValidator";
export declare class AuthParamsValidator extends AbstractParamsValidator {
    static validate(props: AuthParams): true | never;
}
