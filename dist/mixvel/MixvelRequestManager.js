"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequestManager = exports.MixvelEndpointManager = void 0;
var RequestGenerationError_1 = require("../core/errors/RequestGenerationError");
var MixvelRequest_1 = require("./MixvelRequest");
var MixvelAppData_1 = require("./MixvelAppData");
var MixvelAuthAppData_1 = require("./auth/MixvelAuthAppData");
var BookParamsValidator_1 = require("./validators/BookParamsValidator");
var SearchParamsValidator_1 = require("./validators/SearchParamsValidator");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var BookMessageMapper_1 = require("./mappers/BookMessageMapper");
var ChangeOrderMessageMapper_1 = require("./mappers/ChangeOrderMessageMapper");
var Mixvel_OfferPriceRQ_1 = require("./messages/Mixvel_OfferPriceRQ");
var Mixvel_OrderRetrieveRQ_1 = require("./messages/Mixvel_OrderRetrieveRQ");
var Mixvel_OrderCancelRQ_1 = require("./messages/Mixvel_OrderCancelRQ");
var MixvelEndpointManager = /** @class */ (function () {
    function MixvelEndpointManager() {
        this.endpoints = require('./config/endpoints').endpoints;
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
    function MixvelRequestManager(conversionStrategy) {
        this.conversionStrategy = conversionStrategy;
        this.endpointManager = new MixvelEndpointManager();
        this.conversionStrategy = conversionStrategy;
    }
    MixvelRequestManager.prototype.createAuthRequest = function (params) {
        // @todo map request options
        var mixvelRequestOptions = {
            endpoint: this.endpointManager.getEndpointByKey('auth'),
            method: "GET"
        };
        return new MixvelRequest_1.MixvelRequest(new MixvelAuthAppData_1.MixvelAuthAppData(params.login, params.password, params.structureId), mixvelRequestOptions, this.conversionStrategy);
    };
    MixvelRequestManager.prototype.createSearchRequest = function (params) {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params),
            validator: SearchParamsValidator_1.SearchParamsValidator
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
            mapper: new ChangeOrderMessageMapper_1.ChangeOrderMessageMapper(params), // @todo add specific validation
        });
    };
    MixvelRequestManager.prototype.createRequest = function (params, options) {
        // run specific mixvel validation
        if (options.validator) {
            options.validator.validate(params);
        }
        // map to mixvel message
        var rq = options.mapper.map();
        // @todo map request options
        var mixvelRequestOptions = {
            endpoint: this.endpointManager.getEndpointForMessage(rq),
            method: "GET"
        };
        return new MixvelRequest_1.MixvelRequest(new MixvelAppData_1.MixvelAppData(rq), mixvelRequestOptions, this.conversionStrategy);
    };
    return MixvelRequestManager;
}());
exports.MixvelRequestManager = MixvelRequestManager;
