"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractParamsValidator = void 0;
var AbstractParamsValidator = /** @class */ (function () {
    function AbstractParamsValidator() {
    }
    /**
     * @throws {ParamsValidationError}
     * @param params
     */
    AbstractParamsValidator.validate = function (params) {
        return true;
    };
    return AbstractParamsValidator;
}());
exports.AbstractParamsValidator = AbstractParamsValidator;
