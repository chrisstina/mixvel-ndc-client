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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceParamsValidator = void 0;
var assert_1 = __importDefault(require("assert"));
var AbstractParamsValidator_1 = require("../../../core/request/AbstractParamsValidator");
var PriceParamsValidator = /** @class */ (function (_super) {
    __extends(PriceParamsValidator, _super);
    function PriceParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PriceParamsValidator.validate = function (params) {
        params.offers.map(function (offer) {
            (0, assert_1.default)(offer.offerOwner, 'Missing offer owner');
            (0, assert_1.default)(offer.offerId, 'Missing offer id');
            (0, assert_1.default)(offer.responseId, 'Missing response id');
            offer.offerItems.forEach(function (item) {
                (0, assert_1.default)(item.offerItemId !== undefined, 'Missing offer item id');
                (0, assert_1.default)(item.paxs !== undefined, 'Missing offer item paxs');
            });
        });
        return true;
    };
    return PriceParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.PriceParamsValidator = PriceParamsValidator;
