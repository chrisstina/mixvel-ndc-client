"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketIssueParams = void 0;
var TicketIssueParams = /** @class */ (function () {
    function TicketIssueParams(orderId, payment, formOfPayment) {
        this.orderId = orderId;
        this.payment = payment;
        this.formOfPayment = formOfPayment;
    }
    return TicketIssueParams;
}());
exports.TicketIssueParams = TicketIssueParams;
