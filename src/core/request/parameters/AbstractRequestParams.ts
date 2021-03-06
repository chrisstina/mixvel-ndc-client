import {Result} from "../../Result";
import {RequestValidationError} from "../../errors/RequestValidationError";
import {IValidatorService} from "../../../interfaces/IValidatorService";
import {ClassValidatorService} from "../../../services/ClassValidatorService";

export type RequestProps<ParamsType> = {[Property in keyof ParamsType]: ParamsType[Property]}

export abstract class AbstractRequestParams {
    public static validatorService: IValidatorService = new ClassValidatorService()

    public static validate<T extends AbstractRequestParams>(params: T): Result<T> {
        const validationErrors = AbstractRequestParams.validatorService.getValidator<T>().validate(params)
        if (validationErrors.length > 0) {
            const validationErrorText = AbstractRequestParams.validatorService.collectValidationErrors(validationErrors).join(', ')
            return Result.fail<T>(new RequestValidationError(validationErrorText).message)
        }
        return Result.ok<T>(params)
    }

    public static create<T extends AbstractRequestParams>(props: RequestProps<T>): Result<T> {
        const params = this.prototype.constructor(props)
        return AbstractRequestParams.validate<T>(params)
    }
}