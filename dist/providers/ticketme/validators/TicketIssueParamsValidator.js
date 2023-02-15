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
exports.TicketIssueParamsValidator = void 0;
var AbstractParamsValidator_1 = require("../../../core/request/AbstractParamsValidator");
var TicketIssue_1 = require("../request/parameters/TicketIssue");
var TicketIssueParamsValidator = /** @class */ (function (_super) {
    __extends(TicketIssueParamsValidator, _super);
    function TicketIssueParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TicketIssueParamsValidator.validate = function (params) {
        var paramsOrError = TicketIssue_1.TicketMeTicketIssueParams.create(params);
        if (paramsOrError.isFailure) {
            return paramsOrError.error || "Generic parameter validation error";
        }
        return null;
    };
    return TicketIssueParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.TicketIssueParamsValidator = TicketIssueParamsValidator;
