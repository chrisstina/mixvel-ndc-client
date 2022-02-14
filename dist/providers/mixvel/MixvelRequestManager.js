"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequestManager = void 0;
var MixvelRequest_1 = require("./MixvelRequest");
var MixvelAppData_1 = require("./MixvelAppData");
var MixvelAuthAppData_1 = require("./auth/MixvelAuthAppData");
var BookParamsValidator_1 = require("./validators/BookParamsValidator");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var BookMessageMapper_1 = require("./mappers/BookMessageMapper");
var IssueOrderMessageMapper_1 = require("./mappers/IssueOrderMessageMapper");
var RefundOrderMessageMapper_1 = require("./mappers/RefundOrderMessageMapper");
var Mixvel_OfferPriceRQ_1 = require("./messages/Mixvel_OfferPriceRQ");
var Mixvel_OrderRetrieveRQ_1 = require("./messages/Mixvel_OrderRetrieveRQ");
var Mixvel_OrderCancelRQ_1 = require("./messages/Mixvel_OrderCancelRQ");
var Mixvel_ServiceListRQ_1 = require("./messages/Mixvel_ServiceListRQ");
var Mixvel_OrderReshopRQ_1 = require("./messages/Mixvel_OrderReshopRQ");
var Mixvel_OrderRulesRQ_1 = require("./messages/Mixvel_OrderRulesRQ");
var MixvelRequestManager = /** @class */ (function () {
    function MixvelRequestManager(endpointManager, conversionStrategy, requestOptionsManager) {
        this.endpointManager = endpointManager;
        this.conversionStrategy = conversionStrategy;
        this.requestOptionsManager = requestOptionsManager;
        this.extraConfiguration = {}; // no extra config here
    }
    MixvelRequestManager.prototype.createAuthRequest = function (params) {
        return new MixvelRequest_1.MixvelRequest(new MixvelAuthAppData_1.MixvelAuthAppData(params.login, params.password, params.structureId), this.requestOptionsManager.create({ endpoint: this.endpointManager.getEndpointByKey('auth') }), this.conversionStrategy);
    };
    MixvelRequestManager.prototype.createSearchRequest = function (params) {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params)
        });
    };
    /**
     * @param params
     * @private
     */
    MixvelRequestManager.preparePriceParams = function (params) {
        var offerId = params.offers[0].offerId, offerItemIds = params.offers.reduce(function (items, _a) {
            var offerItems = _a.offerItems;
            return __spreadArray(__spreadArray([], items, true), offerItems.map(function (_a) {
                var offerItemId = _a.offerItemId;
                return offerItemId;
            }), true);
        }, []);
        return { offerId: offerId, offerItemIds: offerItemIds };
    };
    MixvelRequestManager.prototype.createPriceRequest = function (params) {
        var restructuredParams = MixvelRequestManager.preparePriceParams(params);
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OfferPriceRQ_1.Mixvel_OfferPriceRQ(restructuredParams.offerId, restructuredParams.offerItemIds);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createBookRequest = function (params) {
        return this.createRequest(params, {
            mapper: new BookMessageMapper_1.BookMessageMapper(params),
            validator: BookParamsValidator_1.BookParamsValidator
        });
    };
    MixvelRequestManager.prototype.createOrderRetrieveRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderRetrieveRQ_1.Mixvel_OrderRetrieveRQ(params.orderId);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createOrderCancelRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderCancelRQ_1.Mixvel_OrderCancelRQ(params.orderId);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createTicketIssueRequest = function (params) {
        return this.createRequest(params, {
            mapper: new IssueOrderMessageMapper_1.IssueOrderMessageMapper(params), // @todo add specific validation
        });
    };
    MixvelRequestManager.prototype.createRefundCalculationRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderReshopRQ_1.Mixvel_OrderReshopRQ(params.orderId);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createRefundRequest = function (params) {
        return this.createRequest(params, {
            mapper: new RefundOrderMessageMapper_1.RefundOrderMessageMapper(params),
        });
    };
    MixvelRequestManager.prototype.createFareRulesRequest = function (params) {
        var restructuredParams = MixvelRequestManager.preparePriceParams(params);
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderRulesRQ_1.Mixvel_OrderRulesRQ(restructuredParams.offerId, restructuredParams.offerItemIds);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createRequest = function (requestParams, services) {
        // run specific mixvel validation
        if (services.validator) {
            services.validator.validate(requestParams);
        }
        // map to mixvel message
        var rq = services.mapper.map();
        return new MixvelRequest_1.MixvelRequest(new MixvelAppData_1.MixvelAppData(rq), this.requestOptionsManager.create({ endpoint: this.endpointManager.getEndpointForMessage(rq) }), this.conversionStrategy);
    };
    MixvelRequestManager.prototype.createServiceListRequest = function (params) {
        var restructuredParams = MixvelRequestManager.preparePriceParams(params);
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_ServiceListRQ_1.Mixvel_ServiceListRQ(restructuredParams.offerId, restructuredParams.offerItemIds);
                }
            }
        });
    };
    return MixvelRequestManager;
}());
exports.MixvelRequestManager = MixvelRequestManager;
