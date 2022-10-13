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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketIssueParams = exports.Payment = exports.FormOfPayment = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("./AbstractRequestParams");
var FormOfPayment = /** @class */ (function () {
    function FormOfPayment(type, data) {
        this.data = data;
        this.type = type;
    }
    __decorate([
        (0, class_validator_1.IsIn)(["CASH", "BILL", "CARD"])
    ], FormOfPayment.prototype, "type", void 0);
    return FormOfPayment;
}());
exports.FormOfPayment = FormOfPayment;
var Payment = /** @class */ (function () {
    function Payment(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    __decorate([
        (0, class_validator_1.IsPositive)()
    ], Payment.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsString)()
    ], Payment.prototype, "currency", void 0);
    return Payment;
}());
exports.Payment = Payment;
var TicketIssueParams = /** @class */ (function (_super) {
    __extends(TicketIssueParams, _super);
    function TicketIssueParams(props) {
        var _this = _super.call(this) || this;
        _this.orderId = props.orderId;
        _this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data);
        _this.payment = new Payment(props.payment.amount, props.payment.currency);
        _this.orderOwner = props.orderOwner;
        _this.paxs = props.paxs;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], TicketIssueParams.prototype, "orderId", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], TicketIssueParams.prototype, "payment", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], TicketIssueParams.prototype, "formOfPayment", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], TicketIssueParams.prototype, "orderOwner", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], TicketIssueParams.prototype, "paxs", void 0);
    return TicketIssueParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.TicketIssueParams = TicketIssueParams;
