import { validateSync, ValidationError } from "class-validator";
import { IValidator } from "../interfaces/IValidator";
import { IValidatorService } from "../interfaces/IValidatorService";

class ClassValidator<T extends object> implements IValidator {
  public validate(params: T): ValidationError[] {
    return validateSync(params);
  }
}

export class ClassValidatorService implements IValidatorService {
  public getValidator<T extends object>(): IValidator {
    return new ClassValidator<T>();
  }

  public collectValidationErrors(
    validationErrors: ValidationError[]
  ): string[] {
    return collectValidationErrors(validationErrors, []);
  }
}

/**
 * @param {ValidationError[]} validationErrors
 * @param {string[]} errorStrings
 */
function collectValidationErrors(
  validationErrors: ValidationError[],
  errorStrings: string[] = []
): string[] {
  for (const validationError of validationErrors) {
    if (validationError.constraints) {
      errorStrings.push(...Object.values(validationError.constraints));
    }

    if (validationError.children && validationError.children.length > 0) {
      return [
        ...errorStrings,
        ...collectValidationErrors(validationError.children, errorStrings),
      ];
    }
  }
  return errorStrings;
}
