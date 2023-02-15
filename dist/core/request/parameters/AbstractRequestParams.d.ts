import { Result } from "../../Result";
import { IValidatorService } from "../../../interfaces/IValidatorService";
import { IValidator } from "../../../interfaces/IValidator";
declare type JustMethodKeys<ParamsType> = {
    [P in keyof ParamsType]: ParamsType[P] extends Function ? P : never;
}[keyof ParamsType];
export declare type RequestProps<ParamsType> = Omit<{
    [Property in keyof ParamsType]: ParamsType[Property];
}, JustMethodKeys<ParamsType>>;
export declare abstract class AbstractRequestParams {
    static validatorService: IValidatorService;
    static validate<T extends AbstractRequestParams>(params: T): Result<T>;
    static getValidator<T extends object>(): IValidator;
    static collectValidationErrors(validationErrors: object[] | string[]): string[];
}
export {};
