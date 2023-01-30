import {ValidationArguments, ValidatorConstraintInterface} from "class-validator";

export declare class IsPersonName implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string;
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
}
