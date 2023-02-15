import { ValidationError } from "class-validator";
import { IValidator } from "../interfaces/IValidator";
import { IValidatorService } from "../interfaces/IValidatorService";
export declare class ClassValidatorService implements IValidatorService {
    getValidator<T extends object>(): IValidator;
    collectValidationErrors(validationErrors: ValidationError[]): string[];
}
