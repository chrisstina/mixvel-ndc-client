"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceParamsValidator = void 0;
var AbstractParamsValidator_1 = require("../../../core/request/AbstractParamsValidator");
var Price_1 = require("../request/parameters/Price");
var PriceParamsValidator = /** @class */ (function (_super) {
    __extends(PriceParamsValidator, _super);
    function PriceParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PriceParamsValidator.validate = function (params) {
        var paramsOrError = Price_1.SirenaPriceParams.create(params);
        if (paramsOrError.isFailure) {
            return paramsOrError.error || "Generic parameter validation error";
        }
        return null;
    };
    return PriceParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.PriceParamsValidator = PriceParamsValidator;
