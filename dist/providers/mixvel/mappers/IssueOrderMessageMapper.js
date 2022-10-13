"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueOrderMessageMapper = void 0;
var Mixvel_OrderChangeRQ_1 = require("../messages/Mixvel_OrderChangeRQ");
var commonMappers_1 = require("./commonMappers");
var IssueOrderMessageMapper = /** @class */ (function () {
    function IssueOrderMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_OrderChangeRQ_1.Mixvel_OrderChangeRQ(this.params.orderId);
    }
    IssueOrderMessageMapper.prototype.map = function () {
        this.setPaymentDetails({ amount: this.params.payment.amount.toString(), currency: this.params.payment.currency }, (0, commonMappers_1.toFOP)(this.params.formOfPayment));
        return this.message;
    };
    IssueOrderMessageMapper.prototype.setPaymentDetails = function (_a, fop) {
        var amount = _a.amount, currency = _a.currency;
        this.message.PaymentFunctions = {
            "PaymentProcessingDetails": {
                "Amount": { "_": amount, "$": { "CurCode": currency } },
                "PaymentProcessingDetailsPaymentMethod": fop
            }
        };
    };
    return IssueOrderMessageMapper;
}());
exports.IssueOrderMessageMapper = IssueOrderMessageMapper;
