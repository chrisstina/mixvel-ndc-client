"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationService = void 0;
var class_validator_1 = require("class-validator");
var RequestParamsValidator = /** @class */ (function () {
    function RequestParamsValidator() {
    }
    RequestParamsValidator.prototype.validate = function (params) {
        return (0, class_validator_1.validateSync)(params);
    };
    return RequestParamsValidator;
}());
var RequestValidationService = /** @class */ (function () {
    function RequestValidationService() {
    }
    RequestValidationService.prototype.getValidator = function () {
        return new RequestParamsValidator();
    };
    RequestValidationService.prototype.collectValidationErrors = function (validationErrors) {
        return collectValidationErrors(validationErrors, []);
    };
    return RequestValidationService;
}());
exports.RequestValidationService = RequestValidationService;
/**
 * @param {ValidationError[]} validationErrors
 * @param {string[]} errorStrings
 */
function collectValidationErrors(validationErrors, errorStrings) {
    if (errorStrings === void 0) { errorStrings = []; }
    for (var _i = 0, validationErrors_1 = validationErrors; _i < validationErrors_1.length; _i++) {
        var validationError = validationErrors_1[_i];
        if (validationError.constraints) {
            errorStrings.push.apply(errorStrings, Object.values(validationError.constraints));
        }
        if (validationError.children && validationError.children.length > 0) {
            return __spreadArray(__spreadArray([], errorStrings, true), collectValidationErrors(validationError.children, errorStrings), true);
        }
    }
    return errorStrings;
}
