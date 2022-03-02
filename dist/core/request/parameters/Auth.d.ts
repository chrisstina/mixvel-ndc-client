import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
export declare type AuthProps = RequestProps<AuthParams>;
export declare class AuthParams extends AbstractRequestParams {
    readonly login: string;
    readonly password: string;
    readonly structureId: string;
    private constructor();
}
