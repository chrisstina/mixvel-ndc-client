"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderRulesRQ = void 0;
var Mixvel_OrderRulesRQ = /** @class */ (function () {
    function Mixvel_OrderRulesRQ(offerOrOrderId, offerItemIds) {
        if (offerItemIds) {
            // request by offer
            this.RulesCoreRequest = {
                OfferRequest: {
                    OfferID: offerOrOrderId,
                    OfferItem: offerItemIds.map(function (offerItemId) {
                        return {
                            OfferItemID: offerItemId,
                        };
                    }),
                },
            };
        }
        else {
            this.RulesCoreRequest = {
                // request by order
                OrderRequest: {
                    OrderID: offerOrOrderId,
                },
            };
        }
    }
    Object.defineProperty(Mixvel_OrderRulesRQ.prototype, "xmlns", {
        get: function () {
            return {
                "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderRulesRQ/1_00",
            };
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
