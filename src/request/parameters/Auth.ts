import {IsAlphanumeric} from "class-validator";
import {Result} from "../../core/Result";
import {RequestValidationService} from '../../services/RequestValidationService'

const validationService = new RequestValidationService()

export type AuthProps = {
    login: string
    password: string
    structureId: string
}

export class AuthParams {
    @IsAlphanumeric()
    public readonly login: string

    @IsAlphanumeric()
    public readonly password: string

    @IsAlphanumeric()
    public readonly structureId: string

    private constructor(login: string, password: string, structureId: string) {
        this.login = login;
        this.password = password;
        this.structureId = structureId;
    }

    public static create(props: AuthProps): Result<AuthParams> {
        const params = new AuthParams(props.login, props.password, props.structureId)

        const validationErrors = validationService.getValidator<AuthParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<AuthParams>(validationService.collectValidationErrors(validationErrors).join('\r\n')) // @todo
        }

        return Result.ok<AuthParams>(params)
    }
}