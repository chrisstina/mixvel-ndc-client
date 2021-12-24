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
var NDCResponseMessage = require("../NDCResponseMessage");
var IATA_OfferPriceRS = /** @class */ (function (_super) {
    __extends(IATA_OfferPriceRS, _super);
    function IATA_OfferPriceRS(responseJSON) {
        return _super.call(this, 'Op:Mixvel_OfferPriceRS', responseJSON) || this;
    }
    return IATA_OfferPriceRS;
}(NDCResponseMessage));
module.exports = IATA_OfferPriceRS;
