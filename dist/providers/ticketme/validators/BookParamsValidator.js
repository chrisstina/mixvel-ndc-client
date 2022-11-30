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
exports.BookParamsValidator = void 0;
var AbstractParamsValidator_1 = require("../../../core/request/AbstractParamsValidator");
var Book_1 = require("../request/parameters/Book");
var BookParamsValidator = /** @class */ (function (_super) {
    __extends(BookParamsValidator, _super);
    function BookParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookParamsValidator.validate = function (params) {
        var paramsOrError = Book_1.TicketMeBookParams.create(params);
        if (paramsOrError.isFailure) {
            return paramsOrError.error || 'Generic parameter validation error';
        }
        return null;
    };
    return BookParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.BookParamsValidator = BookParamsValidator;
