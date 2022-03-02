import { AbstractRequestParams } from "./parameters/AbstractRequestParams";
export declare abstract class AbstractParamsValidator {
    validate(params: AbstractRequestParams): null | string;
}
