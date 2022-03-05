"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTicketMessageMapper = void 0;
var AirDocIssueRQ_1 = require("../messages/AirDocIssueRQ");
var fop_1 = require("./dictionary/fop");
var IssueTicketMessageMapper = /** @class */ (function () {
    function IssueTicketMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    IssueTicketMessageMapper.prototype.map = function () {
        var rq = new AirDocIssueRQ_1.AirDocIssueRQ(this.params.paxs || []);
        rq.setPaymentDetails(this.params.orderId, this.params.orderOwner || '', { amount: this.params.payment.amount.toString(), currency: this.params.payment.currency }, {
            fopType: (0, fop_1.toTicketMeType)(this.params.formOfPayment.type),
            fopMethod: (0, fop_1.toTicketMeMethod)(this.params.formOfPayment.type)
        });
        rq.addParty(this.credentials);
        return rq;
    };
    return IssueTicketMessageMapper;
}());
exports.IssueTicketMessageMapper = IssueTicketMessageMapper;
