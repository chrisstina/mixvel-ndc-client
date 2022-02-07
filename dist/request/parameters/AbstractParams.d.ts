import { Result } from "../../core/Result";
export declare class AbstractParams {
    static validate<T extends AbstractParams>(params: T): Result<T>;
    static create<U, T extends AbstractParams>(props: U): Result<T>;
}
