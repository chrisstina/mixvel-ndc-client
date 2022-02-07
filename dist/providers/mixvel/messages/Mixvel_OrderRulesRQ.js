"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderRulesRQ = void 0;
var Mixvel_OrderRulesRQ = /** @class */ (function () {
    function Mixvel_OrderRulesRQ(offerId, offerItemIds) {
        this.RulesCoreRequest = {
            "OfferRequest": {
                "OfferID": offerId,
                "OfferItem": offerItemIds.map(function (offerItemId) {
                    return {
                        "OfferItemID": offerItemId
                    };
                })
            }
        };
    }
    Object.defineProperty(Mixvel_OrderRulesRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderRulesRQ/1_00" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderRulesRQ.prototype, "nodeName", {
        get: function () {
            return "m:Mixvel_OrderRulesRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderRulesRQ;
}());
exports.Mixvel_OrderRulesRQ = Mixvel_OrderRulesRQ;
