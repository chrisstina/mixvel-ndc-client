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
exports.SirenaPriceParams = exports.SirenaOffer = exports.SirenaOfferItemOpts = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("../../../../core/request/parameters/AbstractRequestParams");
var Price_1 = require("../../../../core/request/parameters/Price");
var SirenaFareRule = /** @class */ (function () {
    function SirenaFareRule(from, to, carrier, date, fareBasisCode, fareRuleLocator) {
        this.from = from;
        this.to = to;
        this.carrier = carrier;
        this.date = date;
        this.fareBasisCode = fareBasisCode;
        this.fareRuleLocator = fareRuleLocator;
    }
    return SirenaFareRule;
}());
var SirenaOfferItemOpts = /** @class */ (function () {
    function SirenaOfferItemOpts(opts) {
        this.innerPTC = "";
        if (opts === null || opts === void 0 ? void 0 : opts.innerPTC) {
            this.innerPTC = opts.innerPTC;
        }
        if (opts === null || opts === void 0 ? void 0 : opts.fareRule) {
            this.fareRule = new SirenaFareRule(opts.fareRule.from, opts.fareRule.to, opts.fareRule.carrier, opts.fareRule.date, opts.fareRule.fareBasisCode, opts.fareRule.fareRuleLocator);
        }
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], SirenaOfferItemOpts.prototype, "innerPTC", void 0);
    return SirenaOfferItemOpts;
}());
exports.SirenaOfferItemOpts = SirenaOfferItemOpts;
var SirenaOfferItem = /** @class */ (function (_super) {
    __extends(SirenaOfferItem, _super);
    function SirenaOfferItem(offerItemId, ptc, paxs, opts) {
        return _super.call(this, offerItemId, ptc, paxs, new SirenaOfferItemOpts(opts)) || this;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], SirenaOfferItem.prototype, "ptc", void 0);
    __decorate([
        (0, class_validator_1.IsString)()
    ], SirenaOfferItem.prototype, "paxs", void 0);
    return SirenaOfferItem;
}(Price_1.OfferItem));
var SirenaOffer = /** @class */ (function () {
    function SirenaOffer(offerId, offerItems, offerOwner, responseId) {
        this.offerId = offerId;
        this.offerOwner = offerOwner;
        this.responseId = responseId;
        this.offerItems = offerItems.map(function (item) {
            return new SirenaOfferItem(item.offerItemId, item.ptc, item.paxs, item.opts);
        });
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], SirenaOffer.prototype, "offerId", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], SirenaOffer.prototype, "offerItems", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], SirenaOffer.prototype, "offerOwner", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], SirenaOffer.prototype, "responseId", void 0);
    return SirenaOffer;
}());
exports.SirenaOffer = SirenaOffer;
var SirenaPriceParams = /** @class */ (function (_super) {
    __extends(SirenaPriceParams, _super);
    function SirenaPriceParams(props) {
        var _this = _super.call(this) || this;
        _this.offers = props.offers.map(function (offerData) {
            return new SirenaOffer(offerData.offerId, offerData.offerItems, offerData.offerOwner, offerData.responseId);
        });
        return _this;
    }
    SirenaPriceParams.create = function (props) {
        var params = new SirenaPriceParams(props);
        return AbstractRequestParams_1.AbstractRequestParams.validate(params);
    };
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)()
    ], SirenaPriceParams.prototype, "offers", void 0);
    return SirenaPriceParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.SirenaPriceParams = SirenaPriceParams;
