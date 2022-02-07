import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";
import {RequestValidationError} from "../../core/errors/RequestValidationError";
const validationService = new RequestValidationService()

export class AbstractParams {
    public static validate<T extends AbstractParams>(params: T): Result<T> {
        const validationErrors = validationService.getValidator<T>().validate(params)
        if (validationErrors.length > 0) {
            const validationErrorText = validationService.collectValidationErrors(validationErrors).join(', ')
            return Result.fail<T>(new RequestValidationError(validationErrorText).message)
        }
        return Result.ok<T>(params)
    }

    public static create<U, T extends AbstractParams>(props: U): Result<T> {
        const params = this.prototype.constructor(props)
        return AbstractParams.validate<T>(params)
    }
}