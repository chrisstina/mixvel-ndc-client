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
    BookParamsValidator.validate = function (props) {
        var passengers = props.passengers, offerItemIds = props.offerItemIds;
        passengers.forEach(function (passenger, paxId) {
            // every passenger has to have an offer
            (0, assert_1.default)(offerItemIds.findIndex(function (_a) {
                var ptc = _a.ptc;
                return ptc === passenger.ptc;
            }) !== -1, "No offer found for ".concat(passenger.ptc));
            // middlename is required
            (0, assert_1.default)(passenger.personalInfo.middleName !== undefined && passenger.personalInfo.middleName.length > 0, "Missing middle name for pax #".concat(paxId));
        });
        return true;
    };
    return BookParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.BookParamsValidator = BookParamsValidator;
