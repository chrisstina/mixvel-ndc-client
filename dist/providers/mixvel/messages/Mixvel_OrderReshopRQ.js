"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderReshopRQ = void 0;
var Mixvel_OrderReshopRQ = /** @class */ (function () {
    function Mixvel_OrderReshopRQ(offerId) {
        this.MixOrder = { MixOrderID: offerId };
    }
    Object.defineProperty(Mixvel_OrderReshopRQ.prototype, "xmlns", {
        get: function () {
            return {
                "xmlns:Reshop": "https://www.mixvel.com/API/XSD/Mixvel_OrderReshopRQ/1_00",
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderReshopRQ.prototype, "nodeName", {
        get: function () {
            return "Reshop:Mixvel_OrderReshopRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderReshopRQ;
}());
exports.Mixvel_OrderReshopRQ = Mixvel_OrderReshopRQ;
