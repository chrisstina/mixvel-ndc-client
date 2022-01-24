"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketIssueParams = void 0;
var class_validator_1 = require("class-validator");
var Result_1 = require("../../core/Result");
var RequestValidationService_1 = require("../../services/RequestValidationService");
var validationService = new RequestValidationService_1.RequestValidationService();
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
var TicketIssueParams = /** @class */ (function () {
    function TicketIssueParams(props) {
        this.orderId = props.orderId;
        this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data);
        this.payment = new Payment(props.payment.amount, props.payment.currency);
    }
    TicketIssueParams.create = function (props) {
        var params = new TicketIssueParams(props);
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            return Result_1.Result.fail(validationService.collectValidationErrors(validationErrors).join(', '));
        }
        return Result_1.Result.ok(params);
    };
    __decorate([
        (0, class_validator_1.IsString)()
    ], TicketIssueParams.prototype, "orderId", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], TicketIssueParams.prototype, "payment", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], TicketIssueParams.prototype, "formOfPayment", void 0);
    return TicketIssueParams;
}());
exports.TicketIssueParams = TicketIssueParams;
