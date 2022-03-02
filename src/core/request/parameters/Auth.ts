import {IsNotEmpty, IsString} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";

export type AuthProps = RequestProps<AuthParams>

export class AuthParams extends AbstractRequestParams {
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