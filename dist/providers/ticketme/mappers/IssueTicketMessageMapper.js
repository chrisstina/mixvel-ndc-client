"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTicketMessageMapper = void 0;
var AirDocIssueRQ_1 = require("../messages/AirDocIssueRQ");
var fop_1 = require("./dictionary/fop");
var IssueTicketMessageMapper = /** @class */ (function () {
    function IssueTicketMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new AirDocIssueRQ_1.AirDocIssueRQ(this.params.paxs || []);
        this.message.addParty(this.credentials);
    }
    IssueTicketMessageMapper.prototype.map = function () {
        this.setPaymentDetails(this.params.orderId, this.params.orderOwner || "", {
            amount: this.params.payment.amount.toString(),
            currency: this.params.payment.currency,
        }, {
            fopType: (0, fop_1.toTicketMeType)(this.params.formOfPayment.type),
            fopMethod: (0, fop_1.toTicketMeMethod)(this.params.formOfPayment.type),
        });
        return this.message;
    };
    IssueTicketMessageMapper.prototype.setPaymentDetails = function (orderId, orderOwner, _a, _b) {
        var amount = _a.amount, currency = _a.currency;
        var fopType = _b.fopType, fopMethod = _b.fopMethod;
        if (!this.message.Query[0].TicketDocInfo[0].Payments) {
            this.message.Query[0].TicketDocInfo[0].Payments = [
                {
                    Payment: [
                        {
                            Order: [
                                {
                                    $: {
                                        OrderID: orderId,
                                        Owner: orderOwner,
                                    },
                                },
                            ],
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
                },
            ];
        }
    };
    return IssueTicketMessageMapper;
}());
exports.IssueTicketMessageMapper = IssueTicketMessageMapper;
