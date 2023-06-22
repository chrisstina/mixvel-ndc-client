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
exports.OrderChangeRQ = exports.InvoicePaymentMethod = exports.CashPaymentMethod = exports.CardPaymentMethod = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var CardPaymentMethod = /** @class */ (function () {
    function CardPaymentMethod() {
        this.PaymentCard = [{}];
    }
    return CardPaymentMethod;
}());
exports.CardPaymentMethod = CardPaymentMethod;
var CashPaymentMethod = /** @class */ (function () {
    function CashPaymentMethod() {
        this.Cash = [{ $: { CashInd: true } }];
    }
    return CashPaymentMethod;
}());
exports.CashPaymentMethod = CashPaymentMethod;
var InvoicePaymentMethod = /** @class */ (function () {
    function InvoicePaymentMethod(data) {
        this.Other = [
            { Remarks: [{ Remark: [] }] },
        ];
        this.Other[0].Remarks[0].Remark.push({ _: data });
    }
    return InvoicePaymentMethod;
}());
exports.InvoicePaymentMethod = InvoicePaymentMethod;
var OrderChangeRQ = /** @class */ (function (_super) {
    __extends(OrderChangeRQ, _super);
    function OrderChangeRQ(orderId, offerOwner) {
        var _this = _super.call(this) || this;
        _this.Query = [
            {
                OrderID: [{ $: { Owner: offerOwner }, _: orderId }],
                Payments: [],
                DataLists: [
                    {
                        PassengerList: [],
                        ContactList: [],
                    },
                ],
            },
        ];
        return _this;
    }
    Object.defineProperty(OrderChangeRQ.prototype, "nodeName", {
        get: function () {
            return "OrderChangeRQ";
        },
        enumerable: false,
        configurable: true
    });
    return OrderChangeRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.OrderChangeRQ = OrderChangeRQ;
