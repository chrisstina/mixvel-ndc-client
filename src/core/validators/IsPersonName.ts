import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

const latinNameRegExp = /[^a-zA-Z-\s]/;
const cyrillicNameRegExp = /[^a-zA-Zа-яА-Я-\s]/;

@ValidatorConstraint({ async: false })
export class IsPersonName implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Text ($value) is not a valid person name!";
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        if (!value) {
            return true;
        }
        if (validationArguments?.constraints[0] === true) {
            return !cyrillicNameRegExp.test(value);
        }
        return !latinNameRegExp.test(value);
    }
}
