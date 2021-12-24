"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderCancelRQ = void 0;
var Mixvel_OrderCancelRQ = /** @class */ (function () {
    function Mixvel_OrderCancelRQ(orderId) {
        this.MixOrder = { "MixOrderID": orderId };
    }
    Object.defineProperty(Mixvel_OrderCancelRQ.prototype, "endpoint", {
        get: function () {
            return 'api/Order/cancel';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderCancelRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderCancelRQ/1_01" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderCancelRQ.prototype, "nodeName", {
        get: function () {
            return "m:Mixvel_OrderCancelRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderCancelRQ;
}());
exports.Mixvel_OrderCancelRQ = Mixvel_OrderCancelRQ;
