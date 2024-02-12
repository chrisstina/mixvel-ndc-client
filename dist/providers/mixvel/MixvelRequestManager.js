"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequestManager = void 0;
var FirstAvailableEmailService_1 = require("../../services/FirstAvailableEmailService");
var MixvelRequest_1 = require("./MixvelRequest");
var MixvelAppData_1 = require("./MixvelAppData");
var MixvelAuthAppData_1 = require("./auth/MixvelAuthAppData");
var Result_1 = require("../../core/Result");
var typeguards_1 = require("../../core/request/typeguards");
var BookParamsValidator_1 = require("./validators/BookParamsValidator");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var BookMessageMapper_1 = require("./mappers/BookMessageMapper");
var IssueOrderMessageMapper_1 = require("./mappers/IssueOrderMessageMapper");
var RefundOrderMessageMapper_1 = require("./mappers/RefundOrderMessageMapper");
var SplitOrderMessageMapper_1 = require("./mappers/SplitOrderMessageMapper");
var ServiceListMessageMapper_1 = require("./mappers/ServiceListMessageMapper");
var RefundInfoMessageMapper_1 = require("./mappers/RefundInfoMessageMapper");
var Mixvel_OfferPriceRQ_1 = require("./messages/Mixvel_OfferPriceRQ");
var Mixvel_OrderRetrieveRQ_1 = require("./messages/Mixvel_OrderRetrieveRQ");
var Mixvel_OrderCancelRQ_1 = require("./messages/Mixvel_OrderCancelRQ");
var Mixvel_OrderRulesRQ_1 = require("./messages/Mixvel_OrderRulesRQ");
var MethodNotImplemented_1 = require("../../core/errors/MethodNotImplemented");
var MixvelRequestManager = /** @class */ (function () {
    function MixvelRequestManager(endpointManager, conversionStrategy, requestOptionsManager) {
        this.endpointManager = endpointManager;
        this.conversionStrategy = conversionStrategy;
        this.requestOptionsManager = requestOptionsManager;
        this.extraConfiguration = {}; // no extra config here
    }
    MixvelRequestManager.prepareBookParams = function (params) {
        var passengers = params.passengers;
        passengers.forEach(function (passenger) {
            if (!passenger.contacts.email) {
                passenger.contacts.email =
                    FirstAvailableEmailService_1.FirstAvailableEmailService.getFirstAvailableEmail(params);
            }
        });
        return params;
    };
    MixvelRequestManager.prototype.createAuthRequest = function (params) {
        return Result_1.Result.ok(new MixvelRequest_1.MixvelRequest(new MixvelAuthAppData_1.MixvelAuthAppData(params.login, params.password, params.structureId), this.requestOptionsManager.create({
            endpoint: this.endpointManager.getEndpointByKey("auth"),
        }), this.conversionStrategy));
    };
    MixvelRequestManager.prototype.createSearchRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params),
        }));
    };
    MixvelRequestManager.prototype.createPriceRequest = function (params) {
        var restructuredParams = params.asPlain();
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OfferPriceRQ_1.Mixvel_OfferPriceRQ(restructuredParams.offerId, restructuredParams.offerItemIds);
                },
            },
        }));
    };
    MixvelRequestManager.prototype.createRepriceRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("reprice").message);
    };
    MixvelRequestManager.prototype.createBookRequest = function (params) {
        var restructuredParams = MixvelRequestManager.prepareBookParams(params);
        var validationError = BookParamsValidator_1.BookParamsValidator.validate(restructuredParams);
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new BookMessageMapper_1.BookMessageMapper(restructuredParams),
        }));
    };
    MixvelRequestManager.prototype.createOrderRetrieveRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderRetrieveRQ_1.Mixvel_OrderRetrieveRQ(params.orderId);
                },
            },
        }));
    };
    MixvelRequestManager.prototype.createOrderCancelRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderCancelRQ_1.Mixvel_OrderCancelRQ(params.orderId);
                },
            },
        }));
    };
    MixvelRequestManager.prototype.createTicketIssueRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new IssueOrderMessageMapper_1.IssueOrderMessageMapper(params), // @todo add specific validation
        }));
    };
    MixvelRequestManager.prototype.createRefundCalculationRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new RefundInfoMessageMapper_1.RefundInfoMessageMapper(params),
        }));
    };
    MixvelRequestManager.prototype.createRefundRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new RefundOrderMessageMapper_1.RefundOrderMessageMapper(params),
        }));
    };
    MixvelRequestManager.prototype.createFareRulesRequest = function (params) {
        if ((0, typeguards_1.isPriceParams)(params)) {
            var restructuredParams_1 = params.asPlain();
            return Result_1.Result.ok(this.createRequest(params, {
                mapper: {
                    map: function () {
                        return new Mixvel_OrderRulesRQ_1.Mixvel_OrderRulesRQ(restructuredParams_1.offerId, restructuredParams_1.offerItemIds);
                    },
                },
            }));
        }
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: {
                map: function () {
                    return new Mixvel_OrderRulesRQ_1.Mixvel_OrderRulesRQ(params.orderId);
                },
            },
        }));
    };
    MixvelRequestManager.prototype.createServiceListRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new ServiceListMessageMapper_1.ServiceListMessageMapper(params),
        }));
    };
    MixvelRequestManager.prototype.createServiceAddRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("add service").message);
    };
    MixvelRequestManager.prototype.createOrderSplitRequest = function (params) {
        return Result_1.Result.ok(this.createRequest(params, {
            mapper: new SplitOrderMessageMapper_1.SplitOrderMessageMapper(params),
        }));
    };
    MixvelRequestManager.prototype.createAirlineProfileRequest = function (value) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("airline profile").message);
    };
    MixvelRequestManager.prototype.createRequest = function (requestParams, services) {
        var rq = services.mapper.map(); // map to mixvel message
        return new MixvelRequest_1.MixvelRequest(new MixvelAppData_1.MixvelAppData(rq), this.requestOptionsManager.create({
            endpoint: this.endpointManager.getEndpointForMessage(rq),
        }), this.conversionStrategy);
    };
    return MixvelRequestManager;
}());
exports.MixvelRequestManager = MixvelRequestManager;
