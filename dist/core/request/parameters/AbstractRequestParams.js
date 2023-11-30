"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRequestParams = void 0;
var Result_1 = require("../../Result");
var RequestValidationError_1 = require("../../errors/RequestValidationError");
var ClassValidatorService_1 = require("../../../services/ClassValidatorService");
var AbstractRequestParams = /** @class */ (function () {
    function AbstractRequestParams() {
    }
    AbstractRequestParams.validate = function (params) {
        var validationErrors = this.getValidator().validate(params);
        if (validationErrors.length > 0) {
            var validationErrorText = this.collectValidationErrors(validationErrors).join(", ");
            return Result_1.Result.fail(new RequestValidationError_1.RequestValidationError(validationErrorText).message);
        }
        return Result_1.Result.ok(params);
    };
    AbstractRequestParams.getValidator = function () {
        return this.validatorService.getValidator();
    };
    AbstractRequestParams.collectValidationErrors = function (validationErrors) {
        return this.validatorService.collectValidationErrors(validationErrors);
    };
    AbstractRequestParams.validatorService = new ClassValidatorService_1.ClassValidatorService();
    return AbstractRequestParams;
}());
exports.AbstractRequestParams = AbstractRequestParams;
