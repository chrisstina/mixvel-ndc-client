"use strict";
/**
 *  Resources
 * ============================
 * https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(isSuccess, error, value) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this);
    }
    Result.ok = function (value) {
        return new Result(true, undefined, value);
    };
    Result.fail = function (error) {
        return new Result(false, error);
    };
    Result.prototype.getValue = function () {
        if (!this.isSuccess || !this._value) {
            throw new Error("Cannot retrieve the value from a failed result.");
        }
        return this._value;
    };
    return Result;
}());
exports.Result = Result;
