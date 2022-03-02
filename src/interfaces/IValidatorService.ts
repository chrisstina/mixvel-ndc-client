import {IValidator} from "./IValidator";

export interface IValidatorService {
    getValidator<T extends object>(): IValidator

    collectValidationErrors(validationErrors: object[] | string[]): string[]
}