"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractParams = void 0;
var Result_1 = require("../../Result");
var RequestValidationService_1 = require("../../../services/RequestValidationService");
var RequestValidationError_1 = require("../../errors/RequestValidationError");
var validationService = new RequestValidationService_1.RequestValidationService();
var AbstractParams = /** @class */ (function () {
    function AbstractParams() {
    }
    AbstractParams.validate = function (params) {
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            var validationErrorText = validationService.collectValidationErrors(validationErrors).join(', ');
            return Result_1.Result.fail(new RequestValidationError_1.RequestValidationError(validationErrorText).message);
        }
        return Result_1.Result.ok(params);
    };
    AbstractParams.create = function (props) {
        var params = this.prototype.constructor(props);
        return AbstractParams.validate(params);
    };
    return AbstractParams;
}());
exports.AbstractParams = AbstractParams;
