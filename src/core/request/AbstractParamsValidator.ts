import {AbstractParams} from "./parameters/AbstractParams";

export abstract class AbstractParamsValidator {
    validate(props: AbstractParams): true | never {
        return true
    }
}