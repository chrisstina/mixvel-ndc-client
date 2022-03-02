import {AbstractRequestParams} from "./parameters/AbstractRequestParams";

export abstract class AbstractParamsValidator {
    validate(params: AbstractRequestParams): null | string {
        return null
    }
}