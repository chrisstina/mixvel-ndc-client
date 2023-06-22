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
exports.SirenaTicketIssueParams = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("../../../../core/request/parameters/AbstractRequestParams");
var TicketIssue_1 = require("../../../../core/request/parameters/TicketIssue");
var SirenaFormOfPayment = /** @class */ (function () {
    function SirenaFormOfPayment(type, data) {
        this.data = data;
        this.type = type;
    }
    __decorate([
        (0, class_validator_1.IsIn)(["CASH", "BILL"])
    ], SirenaFormOfPayment.prototype, "type", void 0);
    return SirenaFormOfPayment;
}());
var SirenaTicketIssueParams = /** @class */ (function (_super) {
    __extends(SirenaTicketIssueParams, _super);
    function SirenaTicketIssueParams(props) {
        var _this = _super.call(this) || this;
        _this.orderId = props.orderId;
        _this.formOfPayment = new SirenaFormOfPayment(props.formOfPayment.type, props.formOfPayment.data);
        _this.payment = new TicketIssue_1.Payment(props.payment.amount, props.payment.currency);
        _this.orderOwner = props.orderOwner || "";
        return _this;
    }
    SirenaTicketIssueParams.create = function (props) {
        var params = new SirenaTicketIssueParams(props);
        return AbstractRequestParams_1.AbstractRequestParams.validate(params);
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(1)
    ], SirenaTicketIssueParams.prototype, "orderId", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(1)
    ], SirenaTicketIssueParams.prototype, "orderOwner", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], SirenaTicketIssueParams.prototype, "payment", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], SirenaTicketIssueParams.prototype, "formOfPayment", void 0);
    return SirenaTicketIssueParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.SirenaTicketIssueParams = SirenaTicketIssueParams;
