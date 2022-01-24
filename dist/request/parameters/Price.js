"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceParams = void 0;
var class_validator_1 = require("class-validator");
var Result_1 = require("../../core/Result");
var RequestValidationService_1 = require("../../services/RequestValidationService");
var validationService = new RequestValidationService_1.RequestValidationService();
var PriceParams = /** @class */ (function () {
    function PriceParams(props) {
        this.offerId = props.offerId;
        this.offerItemIds = props.offerItemIds;
    }
    PriceParams.create = function (props) {
        var params = new PriceParams(props);
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            return Result_1.Result.fail(validationService.collectValidationErrors(validationErrors).join(', '));
        }
        return Result_1.Result.ok(params);
    };
    __decorate([
        (0, class_validator_1.IsString)()
    ], PriceParams.prototype, "offerId", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsString)({
            each: true
        })
    ], PriceParams.prototype, "offerItemIds", void 0);
    return PriceParams;
}());
exports.PriceParams = PriceParams;
