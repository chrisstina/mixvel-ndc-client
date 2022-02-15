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
exports.OfferPriceRQ = void 0;
var AbstractTicketMeNDCMessage_1 = require("./AbstractTicketMeNDCMessage");
var OfferPriceRQ = /** @class */ (function (_super) {
    __extends(OfferPriceRQ, _super);
    function OfferPriceRQ(offers, dataLists) {
        var _this = _super.call(this) || this;
        _this.Query = { Offer: offers };
        _this.DataLists = dataLists;
        return _this;
    }
    Object.defineProperty(OfferPriceRQ.prototype, "nodeName", {
        get: function () {
            return "OfferPriceRQ";
        },
        enumerable: false,
        configurable: true
    });
    return OfferPriceRQ;
}(AbstractTicketMeNDCMessage_1.AbstractTicketMeNDCMessage));
exports.OfferPriceRQ = OfferPriceRQ;
