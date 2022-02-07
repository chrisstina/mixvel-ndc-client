"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderRetrieveRQ = void 0;
var Mixvel_OrderRetrieveRQ = /** @class */ (function () {
    function Mixvel_OrderRetrieveRQ(offerId) {
        this.OrderFilterCriteria = { MixOrder: { MixOrderID: offerId } };
    }
    Object.defineProperty(Mixvel_OrderRetrieveRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:o": "https://www.mixvel.com/API/XSD/Mixvel_OrderRetrieveRQ/1_00" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderRetrieveRQ.prototype, "nodeName", {
        get: function () {
            return "o:Mixvel_OrderRetrieveRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderRetrieveRQ;
}());
exports.Mixvel_OrderRetrieveRQ = Mixvel_OrderRetrieveRQ;
