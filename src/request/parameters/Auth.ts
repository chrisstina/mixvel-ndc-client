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

    private constructor(props: AuthProps) {
        super()
        this.login = props.login;
        this.password = props.password;
        this.structureId = props.structureId;
    }
}