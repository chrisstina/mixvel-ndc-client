import {Result} from "../../Result";
import {IValidatorService} from "../../../interfaces/IValidatorService";

declare type JustMethodKeys<ParamsType> = ({
    [P in keyof ParamsType]: ParamsType[P] extends Function ? P : never;
})[keyof ParamsType];
export declare type RequestProps<ParamsType> = Omit<{
    [Property in keyof ParamsType]: ParamsType[Property];
}, JustMethodKeys<ParamsType>>;
export declare abstract class AbstractRequestParams {
    static validatorService: IValidatorService;
    static validate<T extends AbstractRequestParams>(params: T): Result<T>;
    static create<T extends AbstractRequestParams>(props: RequestProps<T>): Result<T>;
}
export {};
