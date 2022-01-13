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
var AbstractParamsValidator_1 = require("./AbstractParamsValidator");
var BookParamsValidator = /** @class */ (function (_super) {
    __extends(BookParamsValidator, _super);
    function BookParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookParamsValidator.validate = function (props) {
        var passengers = props.passengers, offerItemIds = props.offerItemIds, offerId = props.offerId;
        (0, assert_1.default)(offerId.length > 0, 'Missing offer id');
        (0, assert_1.default)(offerItemIds.length > 0, 'Missing offer item ids');
        (0, assert_1.default)(passengers.length > 0, 'Missing passengers');
        //@todo
        return true;
    };
    return BookParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.BookParamsValidator = BookParamsValidator;
