"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OfferPriceRQ = void 0;
var Mixvel_OfferPriceRQ = /** @class */ (function () {
    function Mixvel_OfferPriceRQ(offerId, offerItemIds) {
        this.PricedOffer = {
            SelectedOffer: {
                OfferRefID: offerId, SelectedOfferItem: offerItemIds.map(function (offerItemId) {
                    return {
                        "OfferItemRefID": offerItemId
                    };
                })
            }
        };
    }
    Object.defineProperty(Mixvel_OfferPriceRQ.prototype, "endpoint", {
        get: function () {
            return 'api/Order/offerprice';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OfferPriceRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:OfferPrice": "https://www.mixvel.com/API/XSD/Mixvel_OfferPriceRQ/1_00" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OfferPriceRQ.prototype, "nodeName", {
        get: function () {
            return "OfferPrice:Mixvel_OfferPriceRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OfferPriceRQ;
}());
exports.Mixvel_OfferPriceRQ = Mixvel_OfferPriceRQ;
