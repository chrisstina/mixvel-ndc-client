/**
 *  Resources
 * ============================
 * https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
 */
export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error?: string;
    private readonly _value?;
    private constructor();
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: string): Result<U>;
    getValue(): T;
}
