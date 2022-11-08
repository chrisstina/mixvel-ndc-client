import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export declare type AuthProps = RequestProps<AuthParams>;
export declare class AuthParams extends AbstractRequestParams {
    readonly login: string;
    readonly password: string;
    readonly structureId: string;
    static create(props: AuthProps): Result<AuthParams>;
    private constructor();
}
