import {validateSync, ValidationError} from "class-validator";

class RequestParamsValidator<T extends object> {
    public validate(params: T): ValidationError[] {
        return validateSync(params)
    }
}

export class RequestValidationService {
    public getValidator<T extends object>() {
        return new RequestParamsValidator<T>()
    }

    public collectValidationErrors(validationErrors: ValidationError[]): string[] {
        return collectValidationErrors(validationErrors, [])
    }
}

/**
 * @param {ValidationError[]} validationErrors
 * @param {string[]} errorStrings
 */
function collectValidationErrors(validationErrors: ValidationError[], errorStrings:string[] = []): string[] {
    for (const validationError of validationErrors) {
        if (validationError.constraints) {
            errorStrings.push(...Object.values(validationError.constraints))
        }

        if (validationError.children && validationError.children.length > 0) {
            return [...errorStrings, ...collectValidationErrors(validationError.children, errorStrings)]
        }
    }
    return errorStrings
}

