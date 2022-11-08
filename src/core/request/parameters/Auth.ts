import {IsNotEmpty, IsString} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

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

    public static create(props: AuthProps): Result<AuthParams> {
        const params = new AuthParams(props);
        return AbstractRequestParams.validate<AuthParams>(params);
    }

    private constructor(props: AuthProps) {
        super()
        this.login = props.login;
        this.password = props.password;
        this.structureId = props.structureId;
    }
}