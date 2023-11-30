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
exports.TicketMePriceParams = exports.TicketMeOffer = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("../../../../core/request/parameters/AbstractRequestParams");
var Price_1 = require("../../../../core/request/parameters/Price");
var TicketMeOfferItem = /** @class */ (function (_super) {
    __extends(TicketMeOfferItem, _super);
    function TicketMeOfferItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsIn)([
            "ADULT",
            "CHILD",
            "INFANT",
            "WSEATINFANT",
            "YOUTH",
            "SENIOR",
            "DISABLED",
            "DISABLEDCHILD",
            "ESCORT",
            "LARGEFAMILY",
            "STATERESIDENT",
        ])
    ], TicketMeOfferItem.prototype, "ptc", void 0);
    __decorate([
        (0, class_validator_1.IsString)()
    ], TicketMeOfferItem.prototype, "paxs", void 0);
    return TicketMeOfferItem;
}(Price_1.OfferItem));
var TicketMeOffer = /** @class */ (function () {
    function TicketMeOffer(offerId, offerItems, offerOwner, responseId) {
        this.offerId = offerId;
        this.offerOwner = offerOwner;
        this.responseId = responseId;
        this.offerItems = offerItems.map(function (item) { return new TicketMeOfferItem(item.offerItemId, item.ptc, item.paxs); });
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], TicketMeOffer.prototype, "offerId", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], TicketMeOffer.prototype, "offerItems", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], TicketMeOffer.prototype, "offerOwner", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(1)
    ], TicketMeOffer.prototype, "responseId", void 0);
    return TicketMeOffer;
}());
exports.TicketMeOffer = TicketMeOffer;
var TicketMePriceParams = /** @class */ (function (_super) {
    __extends(TicketMePriceParams, _super);
    function TicketMePriceParams(props) {
        var _this = _super.call(this) || this;
        _this.offers = props.offers.map(function (offerData) {
            return new TicketMeOffer(offerData.offerId, offerData.offerItems, offerData.offerOwner, offerData.responseId);
        });
        return _this;
    }
    TicketMePriceParams.create = function (props) {
        var params = new TicketMePriceParams(props);
        return AbstractRequestParams_1.AbstractRequestParams.validate(params);
    };
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)()
    ], TicketMePriceParams.prototype, "offers", void 0);
    return TicketMePriceParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.TicketMePriceParams = TicketMePriceParams;
