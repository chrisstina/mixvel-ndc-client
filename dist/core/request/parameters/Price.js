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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceParams = exports.Offer = exports.OfferItem = void 0;
var AbstractRequestParams_1 = require("./AbstractRequestParams");
var class_validator_1 = require("class-validator");
var OfferItem = /** @class */ (function () {
    function OfferItem(id, ptc, paxs) {
        this.offerItemId = id;
        this.ptc = ptc;
        this.paxs = paxs;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], OfferItem.prototype, "offerItemId", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsIn)(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ], OfferItem.prototype, "ptc", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], OfferItem.prototype, "paxs", void 0);
    return OfferItem;
}());
exports.OfferItem = OfferItem;
var Offer = /** @class */ (function () {
    function Offer(offerId, offerItems, offerOwner, responseId) {
        this.offerId = offerId;
        this.offerOwner = offerOwner;
        this.responseId = responseId;
        this.offerItems = offerItems.map(function (item) { return new OfferItem(item.offerItemId, item.ptc, item.paxs); });
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], Offer.prototype, "offerId", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], Offer.prototype, "offerItems", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], Offer.prototype, "offerOwner", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], Offer.prototype, "responseId", void 0);
    return Offer;
}());
exports.Offer = Offer;
var PriceParams = /** @class */ (function (_super) {
    __extends(PriceParams, _super);
    function PriceParams(props) {
        var _this = _super.call(this) || this;
        _this.offers = props.offers.map(function (offerData) { return new Offer(offerData.offerId, offerData.offerItems, offerData.offerOwner, offerData.responseId); });
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)()
    ], PriceParams.prototype, "offers", void 0);
    return PriceParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.PriceParams = PriceParams;
