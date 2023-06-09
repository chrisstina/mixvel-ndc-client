"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SirenaRequestManager = void 0;
var Result_1 = require("../../core/Result");
var MethodNotImplemented_1 = require("../../core/errors/MethodNotImplemented");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var PriceMessageMapper_1 = require("./mappers/PriceMessageMapper");
var PriceParamsValidator_1 = require("./validators/PriceParamsValidator");
var defaults_1 = require("./config/defaults");
var SirenaRequest_1 = require("./SirenaRequest");
var SirenaRequestManager = /** @class */ (function () {
    function SirenaRequestManager(endpointManager, conversionStrategy, requestOptionsManager) {
        this.endpointManager = endpointManager;
        this.conversionStrategy = conversionStrategy;
        this.requestOptionsManager = requestOptionsManager;
        this.extraConfiguration = {
            party: { agencyId: "" },
            currency: defaults_1.DEFAULT_CURRENCY,
            lang: defaults_1.DEFAULT_LANG,
        };
    }
    SirenaRequestManager.prototype.createAuthRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("auth").message);
    };
    SirenaRequestManager.prototype.createBookRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("book").message);
    };
    SirenaRequestManager.prototype.createFareRulesRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("rules").message);
    };
    SirenaRequestManager.prototype.createOrderCancelRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("cancel").message);
    };
    SirenaRequestManager.prototype.createOrderRetrieveRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("order").message);
    };
    SirenaRequestManager.prototype.createPriceRequest = function (params) {
        var validationError = this.validateRequest() || PriceParamsValidator_1.PriceParamsValidator.validate(params);
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new PriceMessageMapper_1.PriceMessageMapper(params, this.extraConfiguration.party),
        });
    };
    SirenaRequestManager.prototype.createRefundCalculationRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("refund calc").message);
    };
    SirenaRequestManager.prototype.createRefundRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("refund").message);
    };
    SirenaRequestManager.prototype.createSearchRequest = function (params) {
        var validationError = this.validateRequest();
        if (typeof validationError === "string") {
            return Result_1.Result.fail(validationError);
        }
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params, this.extraConfiguration.party),
        });
    };
    SirenaRequestManager.prototype.createServiceListRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("service list").message);
    };
    SirenaRequestManager.prototype.createTicketIssueRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("ticket").message);
    };
    SirenaRequestManager.prototype.createRepriceRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("reprice").message);
    };
    SirenaRequestManager.prototype.createOrderSplitRequest = function (params) {
        return Result_1.Result.fail(new MethodNotImplemented_1.MethodNotImplemented("split").message);
    };
    SirenaRequestManager.prototype.validateRequest = function () {
        return null;
    };
    SirenaRequestManager.prototype.createRequest = function (requestParams, services) {
        var rq = services.mapper.map();
        return Result_1.Result.ok(new SirenaRequest_1.SirenaRequest(rq, this.requestOptionsManager.create({
            endpoint: this.endpointManager.getEndpointForMessage(rq),
        }), this.conversionStrategy));
    };
    return SirenaRequestManager;
}());
exports.SirenaRequestManager = SirenaRequestManager;
