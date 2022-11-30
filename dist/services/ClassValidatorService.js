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
exports.ClassValidatorService = void 0;
var class_validator_1 = require("class-validator");
var ClassValidator = /** @class */ (function () {
    function ClassValidator() {
    }
    ClassValidator.prototype.validate = function (params) {
        return (0, class_validator_1.validateSync)(params);
    };
    return ClassValidator;
}());
var ClassValidatorService = /** @class */ (function () {
    function ClassValidatorService() {
    }
    ClassValidatorService.prototype.getValidator = function () {
        return new ClassValidator();
    };
    ClassValidatorService.prototype.collectValidationErrors = function (validationErrors) {
        return collectValidationErrors(validationErrors, []);
    };
    return ClassValidatorService;
}());
exports.ClassValidatorService = ClassValidatorService;
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
