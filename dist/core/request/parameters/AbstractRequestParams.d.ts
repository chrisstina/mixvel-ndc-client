import { Result } from "../../Result";
import { IValidatorService } from "../../../interfaces/IValidatorService";
export declare type RequestProps<ParamsType> = {
    [Property in keyof ParamsType]: ParamsType[Property];
};
export declare abstract class AbstractRequestParams {
    static validatorService: IValidatorService;
    static validate<T extends AbstractRequestParams>(params: T): Result<T>;
    static create<T extends AbstractRequestParams>(props: RequestProps<T>): Result<T>;
}
