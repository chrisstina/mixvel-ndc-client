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
exports.BookParamsValidator = void 0;
var assert_1 = __importDefault(require("assert"));
var AbstractParamsValidator_1 = require("../../../core/request/AbstractParamsValidator");
var BookParamsValidator = /** @class */ (function (_super) {
    __extends(BookParamsValidator, _super);
    function BookParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookParamsValidator.validate = function (params) {
        (0, assert_1.default)(params.offer.offerOwner, 'Missing offer owner');
        (0, assert_1.default)(params.offer.offerId, 'Missing offer id');
        (0, assert_1.default)(params.offer.responseId, 'Missing response id');
        params.offer.offerItems.forEach(function (item) {
            (0, assert_1.default)(item.offerItemId !== undefined, 'Missing offer item id');
            (0, assert_1.default)(item.paxs !== undefined, 'Missing offer item paxs');
        });
        params.passengers.forEach(function (passenger) {
            (0, assert_1.default)(passenger.id !== undefined, 'Missing passenger id');
            // every passenger has to have an offer
            (0, assert_1.default)(params.offer.offerItems.findIndex(function (_a) {
                var paxs = _a.paxs;
                return paxs === null || paxs === void 0 ? void 0 : paxs.split(' ').includes(passenger.id || '');
            }) !== -1, "No offer found for passenger ".concat(passenger.id));
        });
        return true;
    };
    return BookParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.BookParamsValidator = BookParamsValidator;
