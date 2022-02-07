"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequestManager = exports.MixvelEndpointManager = void 0;
var RequestGenerationError_1 = require("../../core/errors/RequestGenerationError");
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
var MixvelEndpointManager = /** @class */ (function () {
    function MixvelEndpointManager(endpoints) {
        this.endpoints = endpoints;
    }
    MixvelEndpointManager.prototype.getEndpointForMessage = function (message) {
        return this.getEndpointByKey(message.constructor.name);
    };
    MixvelEndpointManager.prototype.getEndpointByKey = function (id) {
        var endpoint = this.endpoints.get(id);
        if (endpoint) {
            return endpoint;
        }
        throw new RequestGenerationError_1.RequestGenerationError('No endpoint found for ' + id); // @todo
    };
    return MixvelEndpointManager;
}());
exports.MixvelEndpointManager = MixvelEndpointManager;
var MixvelRequestManager = /** @class */ (function () {
    function MixvelRequestManager(endpointManager, conversionStrategy, requestOptionsManager) {
        this.endpointManager = endpointManager;
        this.conversionStrategy = conversionStrategy;
        this.requestOptionsManager = requestOptionsManager;
        this.extraConfiguration = {}; // no extra cnofig here
    }
    MixvelRequestManager.prototype.createAuthRequest = function (params) {
        return new MixvelRequest_1.MixvelRequest(new MixvelAuthAppData_1.MixvelAuthAppData(params.login, params.password, params.structureId), this.requestOptionsManager.create({ endpoint: this.endpointManager.getEndpointByKey('auth') }), this.conversionStrategy);
    };
    MixvelRequestManager.prototype.createSearchRequest = function (params) {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params)
        });
    };
    MixvelRequestManager.prototype.createPriceRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OfferPriceRQ_1.Mixvel_OfferPriceRQ(params.offerId, params.offerItemIds);
                }
            }
        });
    };
    MixvelRequestManager.prototype.createFareRulesRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderRulesRQ_1.Mixvel_OrderRulesRQ(params.offerId, params.offerItemIds);
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
    MixvelRequestManager.prototype.createServiceListRequest = function (params) {
        return this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_ServiceListRQ_1.Mixvel_ServiceListRQ(params.offerId, params.offerItemIds);
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
    return MixvelRequestManager;
}());
exports.MixvelRequestManager = MixvelRequestManager;
