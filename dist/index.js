"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNDCService = void 0;
var Result_1 = require("./core/Result");
var Provider_1 = require("./core/Provider");
var ProviderLocator_1 = require("./core/ProviderLocator");
var ResponseParsingError_1 = __importDefault(require("./core/errors/ResponseParsingError"));
var ObjectToXmlConversionStrategy_1 = require("./services/conversion/ObjectToXmlConversionStrategy");
var XmlToObjectConversionStrategy_1 = require("./services/conversion/XmlToObjectConversionStrategy");
var ObjectToXmlNDCConversionStrategy_1 = require("./services/conversion/ObjectToXmlNDCConversionStrategy");
// import {XmlNDCToObjectConversionStrategy} from "./services/conversion/XmlNDCToObjectConversionStrategy";
var RequestOptionsManager_1 = require("./core/request/RequestOptionsManager");
var Auth_1 = require("./core/request/parameters/Auth");
var Search_1 = require("./core/request/parameters/Search");
var Price_1 = require("./core/request/parameters/Price");
var OrderRetrieve_1 = require("./core/request/parameters/OrderRetrieve");
var Book_1 = require("./core/request/parameters/Book");
var TicketIssue_1 = require("./core/request/parameters/TicketIssue");
var Refund_1 = require("./core/request/parameters/Refund");
// Provider-specific
var datalist_1 = require("./providers/mixvel/constants/datalist");
var MixvelRequestManager_1 = require("./providers/mixvel/MixvelRequestManager");
var MixvelResponseManager_1 = require("./providers/mixvel/MixvelResponseManager");
var DataList_1 = require("./providers/mixvel/DataList");
var TicketMeRequestManager_1 = require("./providers/ticketme/TicketMeRequestManager");
var XmlNDCToObjectConversionStrategy_1 = require("./services/conversion/XmlNDCToObjectConversionStrategy");
var TicketMeResponseManager_1 = require("./providers/ticketme/TicketMeResponseManager");
var pojoToXml = new ObjectToXmlConversionStrategy_1.ObjectToXmlConversionStrategy(), xmlToPojo = new XmlToObjectConversionStrategy_1.XmlToObjectConversionStrategy(), requestOptionsManager = new RequestOptionsManager_1.RequestOptionsManager();
// ================ Provider generation =================
// Mixvel provider
ProviderLocator_1.ProviderLocator.register('mixvel', new Provider_1.Provider(new MixvelRequestManager_1.MixvelRequestManager(new MixvelRequestManager_1.MixvelEndpointManager(require('./providers/mixvel/config/endpoints').endpoints), // @todo take from config
pojoToXml, requestOptionsManager), new MixvelResponseManager_1.MixvelResponseManager(require('./providers/mixvel/config/responses').allowedNodeNames, // @todo take from config
xmlToPojo)));
// TicketMe provider
var ndcVersion = '172'; // @todo take from config
var pojoToNDC = new ObjectToXmlNDCConversionStrategy_1.ObjectToXmlNDCConversionStrategy(ndcVersion), NDCToPojo = new XmlNDCToObjectConversionStrategy_1.XmlNDCToObjectConversionStrategy(ndcVersion);
ProviderLocator_1.ProviderLocator.register('ticketme', new Provider_1.Provider(new TicketMeRequestManager_1.TicketMeRequestManager(new MixvelRequestManager_1.MixvelEndpointManager(require('./providers/ticketme/config/endpoints').endpoints), // @todo take from config
pojoToNDC, requestOptionsManager), new TicketMeResponseManager_1.TicketMeResponseManager(NDCToPojo)));
function createNDCService(provider, providerConfig) {
    if (providerConfig === void 0) { providerConfig = {}; }
    var theProvider = (typeof provider === "string")
        ? ProviderLocator_1.ProviderLocator.get(provider)
        : provider;
    theProvider.extraConfiguration = providerConfig;
    var requestManager = theProvider.requestManager;
    var responseManager = theProvider.responseManager;
    function setProviderConfig(providerConfig) {
        theProvider.extraConfiguration = providerConfig;
    }
    // ========== Request management ==============
    function getAuthRequest(props) {
        var paramsOrError = Auth_1.AuthParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createAuthRequest(paramsOrError.getValue()));
    }
    function getSearchRequest(props) {
        var paramsOrError = Search_1.SearchParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createSearchRequest(paramsOrError.getValue()));
    }
    function getPriceRequest(props) {
        var paramsOrError = Price_1.PriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createPriceRequest(paramsOrError.getValue()));
    }
    function getFareRulesRequest(props) {
        var paramsOrError = Price_1.PriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createFareRulesRequest(paramsOrError.getValue()));
    }
    /**
     * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
     */
    function getBookRequest(props) {
        var paramsOrError = Book_1.BookParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createBookRequest(paramsOrError.getValue()));
    }
    function getOrderRetrieveRequest(props) {
        var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createOrderRetrieveRequest(paramsOrError.getValue()));
    }
    function getTicketIssueRequest(props) {
        var paramsOrError = TicketIssue_1.TicketIssueParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createTicketIssueRequest(paramsOrError.getValue()));
    }
    function getOrderCancelRequest(props) {
        var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createOrderCancelRequest(paramsOrError.getValue()));
    }
    function getServiceListRequest(props) {
        var paramsOrError = Price_1.PriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createServiceListRequest(paramsOrError.getValue()));
    }
    function getRefundCalculationRequest(props) {
        var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createRefundCalculationRequest(paramsOrError.getValue()));
    }
    function getRefundRequest(props) {
        var paramsOrError = Refund_1.RefundParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : Result_1.Result.ok(requestManager.createRefundRequest(paramsOrError.getValue()));
    }
    // ========== Response management ==============
    /**
     * @param {string|{}} data - response XML or JSON with errors
     */
    function getResponse(data) {
        if (typeof data !== "string" && data.errors && Object.values(data.errors).length > 0) {
            return Promise.resolve().then(function () { return Result_1.Result.fail("".concat(data.title, ": ").concat(Object.values(data.errors))); });
        }
        if (typeof data === "string") {
            return responseManager.getResponse(data)
                .then(function (mixvelResponse) {
                return Result_1.Result.ok(mixvelResponse);
            })
                .catch(function (err) { return Result_1.Result.fail(err.message); });
        }
        return Promise.reject(new ResponseParsingError_1.default('Unknown input format'));
    }
    function extractDataLists(dataListSource) {
        var dl = {};
        for (var _i = 0, _a = Object.entries(datalist_1.allowedDataLists); _i < _a.length; _i++) {
            var _b = _a[_i], keyTitle = _b[0], dataListTitle = _b[1];
            dl[keyTitle] = DataList_1.DataList.create(dataListTitle, dataListSource);
        }
        return dl;
    }
    return {
        getAuthRequest: getAuthRequest,
        getSearchRequest: getSearchRequest,
        getPriceRequest: getPriceRequest,
        getBookRequest: getBookRequest,
        getFareRulesRequest: getFareRulesRequest,
        getServiceListRequest: getServiceListRequest,
        getOrderRetrieveRequest: getOrderRetrieveRequest,
        getTicketIssueRequest: getTicketIssueRequest,
        getOrderCancelRequest: getOrderCancelRequest,
        getRefundCalculationRequest: getRefundCalculationRequest,
        getRefundRequest: getRefundRequest,
        getResponse: getResponse,
        extractDataLists: extractDataLists,
        setProviderConfig: setProviderConfig
    };
}
exports.createNDCService = createNDCService;
