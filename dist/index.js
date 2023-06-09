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
var RequestEndpointManager_1 = require("./core/request/RequestEndpointManager");
var RequestOptionsManager_1 = require("./core/request/RequestOptionsManager");
var Auth_1 = require("./core/request/parameters/Auth");
var Search_1 = require("./core/request/parameters/Search");
var Price_1 = require("./core/request/parameters/Price");
var OrderRetrieve_1 = require("./core/request/parameters/OrderRetrieve");
var Book_1 = require("./core/request/parameters/Book");
var TicketIssue_1 = require("./core/request/parameters/TicketIssue");
var Refund_1 = require("./core/request/parameters/Refund");
var Reprice_1 = require("./core/request/parameters/Reprice");
var typeguards_1 = require("./core/request/typeguards");
// Provider-specific
var MixvelRequestManager_1 = require("./providers/mixvel/MixvelRequestManager");
var MixvelResponseManager_1 = require("./providers/mixvel/MixvelResponseManager");
var TicketMeRequestManager_1 = require("./providers/ticketme/TicketMeRequestManager");
var TicketMeResponseManager_1 = require("./providers/ticketme/TicketMeResponseManager");
var SirenaRequestManager_1 = require("./providers/sirena/SirenaRequestManager");
var SirenaResponseManager_1 = require("./providers/sirena/SirenaResponseManager");
var OrderSplit_1 = require("./core/request/parameters/OrderSplit");
var pojoToXml = new ObjectToXmlConversionStrategy_1.ObjectToXmlConversionStrategy(), xmlToPojo = new XmlToObjectConversionStrategy_1.XmlToObjectConversionStrategy(), requestOptionsManager = new RequestOptionsManager_1.RequestOptionsManager();
// ================ Provider generation =================
// Mixvel provider
ProviderLocator_1.ProviderLocator.register("mixvel", new Provider_1.Provider(new MixvelRequestManager_1.MixvelRequestManager(new RequestEndpointManager_1.RequestEndpointManager(require("./providers/mixvel/config/endpoints").endpoints), // @todo take from config
pojoToXml, requestOptionsManager), new MixvelResponseManager_1.MixvelResponseManager(require("./providers/mixvel/config/responses").allowedNodeNames, // @todo take from config
xmlToPojo)));
// TicketMe provider
var ndcVersion = "172"; // @todo take from config
var pojoToNDC = new ObjectToXmlNDCConversionStrategy_1.ObjectToXmlNDCConversionStrategy(ndcVersion);
ProviderLocator_1.ProviderLocator.register("ticketme", new Provider_1.Provider(new TicketMeRequestManager_1.TicketMeRequestManager(new RequestEndpointManager_1.RequestEndpointManager(require("./providers/ticketme/config/endpoints").endpoints), // @todo take from config
pojoToNDC, requestOptionsManager), new TicketMeResponseManager_1.TicketMeResponseManager(xmlToPojo)));
// Sirena NDC provider
ProviderLocator_1.ProviderLocator.register("sirena", new Provider_1.Provider(new SirenaRequestManager_1.SirenaRequestManager(new RequestEndpointManager_1.RequestEndpointManager(require("./providers/sirena/config/endpoints").endpoints), // @todo take from config
new ObjectToXmlNDCConversionStrategy_1.ObjectToXmlNDCConversionStrategy(ndcVersion), requestOptionsManager), new SirenaResponseManager_1.SirenaResponseManager(xmlToPojo)));
function createNDCService(provider, providerConfig) {
    if (providerConfig === void 0) { providerConfig = {}; }
    var theProvider = typeof provider === "string" ? ProviderLocator_1.ProviderLocator.get(provider) : provider;
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
            : requestManager.createAuthRequest(paramsOrError.getValue());
    }
    function getSearchRequest(props) {
        var paramsOrError = Search_1.SearchParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createSearchRequest(paramsOrError.getValue());
    }
    function getPriceRequest(props) {
        var paramsOrError = Price_1.PriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createPriceRequest(paramsOrError.getValue());
    }
    function getFareRulesRequest(props) {
        var paramsOrError;
        if ((0, typeguards_1.isPriceProps)(props)) {
            paramsOrError = Price_1.PriceParams.create(props);
        }
        else if ((0, typeguards_1.isOrderRetrieveProps)(props)) {
            paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        }
        if (paramsOrError === undefined) {
            return Result_1.Result.fail("Could not guess params type");
        }
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createFareRulesRequest(paramsOrError.getValue());
    }
    function getBookRequest(props) {
        var paramsOrError = Book_1.BookParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createBookRequest(paramsOrError.getValue());
    }
    function getOrderRetrieveRequest(props) {
        var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createOrderRetrieveRequest(paramsOrError.getValue());
    }
    function getTicketIssueRequest(props) {
        var paramsOrError = TicketIssue_1.TicketIssueParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createTicketIssueRequest(paramsOrError.getValue());
    }
    function getOrderCancelRequest(props) {
        var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createOrderCancelRequest(paramsOrError.getValue());
    }
    function getServiceListRequest(props) {
        var paramsOrError;
        if ((0, typeguards_1.isPriceProps)(props)) {
            paramsOrError = Price_1.PriceParams.create(props);
        }
        else if ((0, typeguards_1.isOrderRetrieveProps)(props)) {
            paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
        }
        if (paramsOrError === undefined) {
            return Result_1.Result.fail("Could not guess params type");
        }
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createServiceListRequest(paramsOrError.getValue());
    }
    function getRefundCalculationRequest(props) {
        var paramsOrError = Refund_1.RefundParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createRefundCalculationRequest(paramsOrError.getValue());
    }
    function getRefundRequest(props) {
        var paramsOrError = Refund_1.RefundParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createRefundRequest(paramsOrError.getValue());
    }
    function getRepriceRequest(props) {
        var paramsOrError = Reprice_1.RepriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createRepriceRequest(paramsOrError.getValue());
    }
    function getOrderSplitRequest(props) {
        var paramsOrError = OrderSplit_1.OrderSplitParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result_1.Result.fail(paramsOrError.error)
            : requestManager.createOrderSplitRequest(paramsOrError.getValue());
    }
    // ========== Response management ==============
    /**
     * @param {string|{}} data - response XML or JSON with errors
     */
    function getResponse(data) {
        if (typeof data !== "string" &&
            data.errors &&
            Object.values(data.errors).length > 0) {
            return Promise.resolve().then(function () {
                return Result_1.Result.fail("".concat(data.title, ": ").concat(Object.values(data.errors)));
            });
        }
        if (typeof data === "string") {
            return responseManager
                .getResponse(data)
                .then(function (mixvelResponse) {
                return Result_1.Result.ok(mixvelResponse);
            })
                .catch(function (err) { return Result_1.Result.fail(err.message); });
        }
        return Promise.reject(new ResponseParsingError_1.default("Unknown input format"));
    }
    /**
     * @param dataListSource
     * @return {paxList?: {}, paxJourneyList?: {}, segmentList?: {}, priceClassList?: {}, bagList?: {}, validatingPartyList?: {}, odList?: {}, contactList?: {},  serviceList?: {}, penaltyList?: {}, flightList?: {}, fareList?: {},descriptionList?: {}, seatList?:{} } Possible values
     */
    function extractDataLists(dataListSource) {
        var dl = {};
        for (var _i = 0, _a = Object.entries(responseManager.allowedDatalists); _i < _a.length; _i++) {
            var _b = _a[_i], keyTitle = _b[0], dataListInfo = _b[1];
            var dataListTitle = void 0, entityTitle = void 0;
            if (typeof dataListInfo === "string") {
                dataListTitle = dataListInfo;
            }
            else {
                dataListTitle = dataListInfo[0], entityTitle = dataListInfo[1];
            }
            dl[keyTitle] = responseManager.createDataList(dataListTitle, dataListSource, entityTitle);
        }
        return dl;
    }
    return {
        getAuthRequest: getAuthRequest,
        getSearchRequest: getSearchRequest,
        getPriceRequest: getPriceRequest,
        getBookRequest: getBookRequest,
        getRepriceRequest: getRepriceRequest,
        getFareRulesRequest: getFareRulesRequest,
        getServiceListRequest: getServiceListRequest,
        getOrderRetrieveRequest: getOrderRetrieveRequest,
        getTicketIssueRequest: getTicketIssueRequest,
        getOrderCancelRequest: getOrderCancelRequest,
        getRefundCalculationRequest: getRefundCalculationRequest,
        getRefundRequest: getRefundRequest,
        getOrderSplitRequest: getOrderSplitRequest,
        getResponse: getResponse,
        extractDataLists: extractDataLists,
        setProviderConfig: setProviderConfig,
        AuthParams: Auth_1.AuthParams,
        SearchParams: Search_1.SearchParams,
        PriceParams: Price_1.PriceParams,
        BookParams: Book_1.BookParams,
        OrderRetrieveParams: OrderRetrieve_1.OrderRetrieveParams,
        OrderSplitParams: OrderSplit_1.OrderSplitParams,
        TicketIssueParams: TicketIssue_1.TicketIssueParams,
        RepriceParams: Reprice_1.RepriceParams,
        RefundParams: Refund_1.RefundParams,
    };
}
exports.createNDCService = createNDCService;
