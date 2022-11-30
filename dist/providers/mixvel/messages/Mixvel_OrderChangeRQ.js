"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderChangeRQ = void 0;
var Mixvel_OrderChangeRQ = /** @class */ (function () {
    function Mixvel_OrderChangeRQ(orderId) {
        if (orderId) {
            this.setMixOrder(orderId);
        }
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
    Mixvel_OrderChangeRQ.prototype.setMixOrder = function (orderId) {
        this.MixOrder = { MixOrderID: orderId };
    };
    return Mixvel_OrderChangeRQ;
}());
exports.Mixvel_OrderChangeRQ = Mixvel_OrderChangeRQ;
