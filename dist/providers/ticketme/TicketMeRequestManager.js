"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMeRequestManager = void 0;
var Result_1 = require("../../core/Result");
var MethodNotImplemented_1 = require("../../core/errors/MethodNotImplemented");
var TicketMeRequest_1 = require("./TicketMeRequest");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var PriceMessageMapper_1 = require("./mappers/PriceMessageMapper");
var BookMessageMapper_1 = require("./mappers/BookMessageMapper");
var OrderRetrieveMessageMapper_1 = require("./mappers/OrderRetrieveMessageMapper");
var RepriceMessageMapper_1 = require("./mappers/RepriceMessageMapper");
var OrderCancelMessageMapper_1 = require("./mappers/OrderCancelMessageMapper");
var defaults_1 = require("./config/defaults");
var BookParamsValidator_1 = require("./validators/BookParamsValidator");
var PriceParamsValidator_1 = require("./validators/PriceParamsValidator");
var IssueTicketMessageMapper_1 = require("./mappers/IssueTicketMessageMapper");
var TicketIssueParamsValidator_1 = require("./validators/TicketIssueParamsValidator");
var TicketMeRequestManager = /** @class */ (function () {
    function TicketMeRequestManager(endpointManager, conversionStrategy, requestOptionsManager) {
        this.endpointManager = endpointManager;
        this.conversionStrategy = conversionStrategy;
        this.requestOptionsManager = requestOptionsManager;
        this.extraConfiguration = {
            party: { agencyId: '' },
            currency: defaults_1.DEFAULT_CURRENCY,
            lang: defaults_1.DEFAULT_LANG
        };
    }
    TicketMeRequestManager.prototype.createAuthRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented('auth').message);
    };
    TicketMeRequestManager.prototype.createBookRequest = function (params) {
        var validationError = this.validateRequest() || BookParamsValidator_1.BookParamsValidator.validate(params);
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new BookMessageMapper_1.BookMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createFareRulesRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented('rules').message);
    };
    TicketMeRequestManager.prototype.createOrderCancelRequest = function (params) {
        var validationError = this.validateRequest();
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, { mapper: new OrderCancelMessageMapper_1.OrderCancelMessageMapper(params, this.extraConfiguration.party) });
    };
    TicketMeRequestManager.prototype.createOrderRetrieveRequest = function (params) {
        var validationError = this.validateRequest();
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, { mapper: new OrderRetrieveMessageMapper_1.OrderRetrieveMessageMapper(params, this.extraConfiguration.party) });
    };
    TicketMeRequestManager.prototype.createPriceRequest = function (params) {
        var validationError = this.validateRequest() || PriceParamsValidator_1.PriceParamsValidator.validate(params);
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new PriceMessageMapper_1.PriceMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createRefundCalculationRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented('refund calc').message);
    };
    TicketMeRequestManager.prototype.createRefundRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented('refund').message);
    };
    TicketMeRequestManager.prototype.createSearchRequest = function (params) {
        var validationError = this.validateRequest();
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createServiceListRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented('service list').message);
    };
    TicketMeRequestManager.prototype.createTicketIssueRequest = function (params) {
        var validationError = this.validateRequest() || TicketIssueParamsValidator_1.TicketIssueParamsValidator.validate(params);
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new IssueTicketMessageMapper_1.IssueTicketMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createRepriceRequest = function (params) {
        var validationError = this.validateRequest();
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new RepriceMessageMapper_1.RepriceMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createOrderSplitRequest = function (params) {
        throw new Error('not implemented');
    };
    TicketMeRequestManager.prototype.validateRequest = function () {
        if (!this.extraConfiguration.party.agencyId || this.extraConfiguration.party.agencyId.length === 0) {
            return 'No agency ID provided! Use setProviderConfig to set it.';
        }
        return null;
    };
    TicketMeRequestManager.prototype.createRequest = function (requestParams, services) {
        // @todo add currency info - optional
        var rq = services.mapper.map();
        return Result_1.Result.ok(new TicketMeRequest_1.TicketMeRequest(rq, this.requestOptionsManager.create({ endpoint: this.endpointManager.getEndpointForMessage(rq) }), this.conversionStrategy));
    };
    return TicketMeRequestManager;
}());
exports.TicketMeRequestManager = TicketMeRequestManager;
