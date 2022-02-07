import {IsNotEmpty, IsString} from "class-validator";
import {AbstractParams} from "./AbstractParams";
import {Result} from "../../core/Result";

export type AuthProps = {
    login: string
    password: string
    structureId: string
}

export class AuthParams extends AbstractParams {
    @IsString()
    @IsNotEmpty()
    public readonly login: string

    @IsString()
    @IsNotEmpty()
    public readonly password: string

    @IsString()
    @IsNotEmpty()
    public readonly structureId: string

    private constructor(login: string, password: string, structureId: string) {
        super()
        this.login = login;
        this.password = password;
        this.structureId = structureId;
    }

    public static create(props: AuthProps): Result<AuthParams> {
        return this.validate(new AuthParams(props.login, props.password, props.structureId))
    }
}