"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceListMessageMapper = void 0;
var typeguards_1 = require("../../../core/request/typeguards");
var Mixvel_ServiceListRQ_1 = require("../messages/Mixvel_ServiceListRQ");
var ServiceListMessageMapper = /** @class */ (function () {
    function ServiceListMessageMapper(params) {
        this.params = params;
    }
    ServiceListMessageMapper.prototype.map = function () {
        if ((0, typeguards_1.isPriceParams)(this.params)) {
            return new Mixvel_ServiceListRQ_1.Mixvel_ServiceListRQ(this.createOfferRequest(this.params));
        }
        else {
            return new Mixvel_ServiceListRQ_1.Mixvel_ServiceListRQ(this.createOrderRequest(this.params));
        }
    };
    ServiceListMessageMapper.prototype.createOfferRequest = function (params) {
        var plainPriceParams = params.asPlain();
        return {
            OfferRequest: {
                Offer: {
                    OfferID: plainPriceParams.offerId,
                },
            },
        };
    };
    ServiceListMessageMapper.prototype.createOrderRequest = function (params) {
        return {
            OrderRequest: {
                MixOrder: {
                    MixOrderID: params.orderId,
                },
            },
        };
    };
    return ServiceListMessageMapper;
}());
exports.ServiceListMessageMapper = ServiceListMessageMapper;
