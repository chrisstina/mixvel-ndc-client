import { AbstractParams } from "./AbstractParams";
import { Result } from "../../core/Result";
export declare type AuthProps = {
    login: string;
    password: string;
    structureId: string;
};
export declare class AuthParams extends AbstractParams {
    readonly login: string;
    readonly password: string;
    readonly structureId: string;
    private constructor();
    static create(props: AuthProps): Result<AuthParams>;
}
