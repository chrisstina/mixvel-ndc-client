"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderChangeRQ = exports.DirectBill = exports.OtherPaymentMethod = void 0;
var OtherPaymentMethod = /** @class */ (function () {
    function OtherPaymentMethod() {
        this.OtherPaymentMethod = null;
    }
    return OtherPaymentMethod;
}());
exports.OtherPaymentMethod = OtherPaymentMethod;
var DirectBill = /** @class */ (function () {
    function DirectBill(billInfo) {
        return {
            'DirectBill': {
                'BillInfo': billInfo
            }
        };
    }
    return DirectBill;
}());
exports.DirectBill = DirectBill;
var Mixvel_OrderChangeRQ = /** @class */ (function () {
    function Mixvel_OrderChangeRQ(orderId, _a, fop) {
        var amount = _a.amount, currency = _a.currency;
        this.MixOrder = { MixOrderID: orderId };
        this.PaymentFunctions = {
            "PaymentProcessingDetails": {
                "Amount": { "_": amount, "$": { "CurCode": currency } },
                "PaymentProcessingDetailsPaymentMethod": fop
            }
        };
    }
    Object.defineProperty(Mixvel_OrderChangeRQ.prototype, "endpoint", {
        get: function () {
            return 'api/Order/change';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderChangeRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:o": "https://www.mixvel.com/API/XSD/Mixvel_OrderChangeRQ/1_00" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderChangeRQ.prototype, "nodeName", {
        get: function () {
            return "o:Mixvel_OrderChangeRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderChangeRQ;
}());
exports.Mixvel_OrderChangeRQ = Mixvel_OrderChangeRQ;
