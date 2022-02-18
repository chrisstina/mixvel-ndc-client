"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMeRequestManager = void 0;
var assert_1 = __importDefault(require("assert"));
var MethodNotImplemented_1 = require("../../core/errors/MethodNotImplemented");
var TicketMeRequest_1 = require("./TicketMeRequest");
var SearchMessageMapper_1 = require("./mappers/SearchMessageMapper");
var PriceMessageMapper_1 = require("./mappers/PriceMessageMapper");
var BookMessageMapper_1 = require("./mappers/BookMessageMapper");
var OrderRetrieveMessageMapper_1 = require("./mappers/OrderRetrieveMessageMapper");
var PriceParamsValidator_1 = require("./validators/PriceParamsValidator");
var BookParamsValidator_1 = require("./validators/BookParamsValidator");
var defaults_1 = require("./config/defaults");
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
        throw new MethodNotImplemented_1.MethodNotImplemented('auth');
    };
    TicketMeRequestManager.prototype.createBookRequest = function (params) {
        return this.createRequest(params, {
            mapper: new BookMessageMapper_1.BookMessageMapper(params, this.extraConfiguration.party),
            validator: BookParamsValidator_1.BookParamsValidator
        });
    };
    TicketMeRequestManager.prototype.createFareRulesRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('rules');
    };
    TicketMeRequestManager.prototype.createOrderCancelRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('cancel');
    };
    TicketMeRequestManager.prototype.createOrderRetrieveRequest = function (params) {
        return this.createRequest(params, {
            mapper: new OrderRetrieveMessageMapper_1.OrderRetrieveMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createPriceRequest = function (params) {
        return this.createRequest(params, {
            validator: PriceParamsValidator_1.PriceParamsValidator,
            mapper: new PriceMessageMapper_1.PriceMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createRefundCalculationRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('refund calc');
    };
    TicketMeRequestManager.prototype.createRefundRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('refund');
    };
    TicketMeRequestManager.prototype.createSearchRequest = function (params) {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper_1.SearchMessageMapper(params, this.extraConfiguration.party)
        });
    };
    TicketMeRequestManager.prototype.createServiceListRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('service list');
    };
    TicketMeRequestManager.prototype.createTicketIssueRequest = function (params) {
        throw new MethodNotImplemented_1.MethodNotImplemented('ticket issue');
    };
    TicketMeRequestManager.prototype.createRequest = function (requestParams, services) {
        (0, assert_1.default)(this.extraConfiguration.party.agencyId && this.extraConfiguration.party.agencyId.length > 0, 'No agency ID provided! Use setProviderConfig to set it.');
        // run specific ticketme validation
        if (services.validator) {
            services.validator.validate(requestParams);
        }
        // map to ticketme message
        var rq = services.mapper.map();
        console.log(JSON.stringify(rq));
        // @todo add currency info - optional
        return new TicketMeRequest_1.TicketMeRequest(rq, this.requestOptionsManager.create({ endpoint: this.endpointManager.getEndpointForMessage(rq) }), this.conversionStrategy);
    };
    return TicketMeRequestManager;
}());
exports.TicketMeRequestManager = TicketMeRequestManager;
