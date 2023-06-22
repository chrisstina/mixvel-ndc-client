"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTicketMessageMapper = void 0;
var OrderChangeRQ_1 = require("../messages/OrderChangeRQ");
var fop_1 = require("./dictionary/fop");
var IssueTicketMessageMapper = /** @class */ (function () {
    function IssueTicketMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OrderChangeRQ_1.OrderChangeRQ(params.orderId, params.orderOwner);
        this.message.addParty(this.credentials);
    }
    IssueTicketMessageMapper.prototype.map = function () {
        this.setPaymentDetails({
            amount: this.params.payment.amount.toString(),
            currency: this.params.payment.currency,
        }, {
            fopType: (0, fop_1.toSirenaType)(this.params.formOfPayment.type),
            fopMethod: (0, fop_1.toSirenaMethod)(this.params.formOfPayment.type, this.params.formOfPayment.data),
        });
        return this.message;
    };
    IssueTicketMessageMapper.prototype.setPaymentDetails = function (_a, _b) {
        var amount = _a.amount, currency = _a.currency;
        var fopType = _b.fopType, fopMethod = _b.fopMethod;
        this.message.Query[0].Payments.push({
            Payment: [
                {
                    Amount: [
                        {
                            $: { Code: currency },
                            _: amount,
                        },
                    ],
                    Method: [fopMethod],
                    Type: [{ _: fopType }],
                },
            ],
        });
    };
    return IssueTicketMessageMapper;
}());
exports.IssueTicketMessageMapper = IssueTicketMessageMapper;
