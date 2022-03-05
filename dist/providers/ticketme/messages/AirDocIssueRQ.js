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
exports.AirDocIssueRQ = exports.OtherPaymentMethod = exports.CashPaymentMethod = exports.CardPaymentMethod = void 0;
var AbstractTicketMeNDCMessage_1 = require("./AbstractTicketMeNDCMessage");
var CardPaymentMethod = /** @class */ (function () {
    function CardPaymentMethod() {
        this.PaymentCard = [{}];
    }
    return CardPaymentMethod;
}());
exports.CardPaymentMethod = CardPaymentMethod;
var CashPaymentMethod = /** @class */ (function () {
    function CashPaymentMethod() {
        this.Cash = [{}];
    }
    return CashPaymentMethod;
}());
exports.CashPaymentMethod = CashPaymentMethod;
var OtherPaymentMethod = /** @class */ (function () {
    function OtherPaymentMethod() {
        this.Other = [{}];
    }
    return OtherPaymentMethod;
}());
exports.OtherPaymentMethod = OtherPaymentMethod;
var AirDocIssueRQ = /** @class */ (function (_super) {
    __extends(AirDocIssueRQ, _super);
    function AirDocIssueRQ(paxs) {
        var _this = _super.call(this) || this;
        _this.Query = [{
                TicketDocQuantity: [{ _: paxs.length.toString() }],
                TicketDocInfo: paxs.map(function (paxRef) {
                    return {
                        PassengerReference: [{ _: paxRef }],
                    };
                })
            }];
        return _this;
    }
    Object.defineProperty(AirDocIssueRQ.prototype, "nodeName", {
        get: function () {
            return "AirDocIssueRQ";
        },
        enumerable: false,
        configurable: true
    });
    AirDocIssueRQ.prototype.setPaymentDetails = function (orderId, orderOwner, _a, _b) {
        var amount = _a.amount, currency = _a.currency;
        var fopType = _b.fopType, fopMethod = _b.fopMethod;
        if (!this.Query[0].TicketDocInfo[0].Payments) {
            this.Query[0].TicketDocInfo[0].Payments = [{
                    Payment: [{
                            Order: [{
                                    "$": {
                                        "OrderID": orderId,
                                        "Owner": orderOwner
                                    }
                                }],
                            Amount: [{
                                    "$": { "Code": currency },
                                    "_": amount
                                }],
                            Method: [fopMethod],
                            Type: [{ _: fopType }]
                        }]
                }];
        }
    };
    return AirDocIssueRQ;
}(AbstractTicketMeNDCMessage_1.AbstractTicketMeNDCMessage));
exports.AirDocIssueRQ = AirDocIssueRQ;
