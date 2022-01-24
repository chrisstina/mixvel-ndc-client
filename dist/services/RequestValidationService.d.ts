import { ValidationError } from "class-validator";
declare class RequestParamsValidator<T extends object> {
    validate(params: T): ValidationError[];
}
export declare class RequestValidationService {
    getValidator<T extends object>(): RequestParamsValidator<T>;
    collectValidationErrors(validationErrors: ValidationError[]): string[];
}
export {};
