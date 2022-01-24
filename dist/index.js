"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataLists = exports.getResponse = exports.getRefundRequest = exports.getRefundCalculationRequest = exports.getServiceListRequest = exports.getOrderCancelRequest = exports.getTicketIssueRequest = exports.getOrderRetrieveRequest = exports.getBookRequest = exports.getFareRulesRequest = exports.getPriceRequest = exports.getSearchRequest = exports.getAuthRequest = void 0;
var MixvelRequestManager_1 = require("./mixvel/MixvelRequestManager");
var Result_1 = require("./core/Result");
var ObjectToXmlConversionStrategy_1 = require("./services/conversion/ObjectToXmlConversionStrategy");
var XmlToObjectConversionStrategy_1 = require("./services/conversion/XmlToObjectConversionStrategy");
var Auth_1 = require("./request/parameters/Auth");
var Search_1 = require("./request/parameters/Search");
var Price_1 = require("./request/parameters/Price");
var OrderRetrieve_1 = require("./request/parameters/OrderRetrieve");
var Book_1 = require("./request/parameters/Book");
var TicketIssue_1 = require("./request/parameters/TicketIssue");
var Refund_1 = require("./request/parameters/Refund");
var MixvelResponseManager_1 = require("./mixvel/MixvelResponseManager");
var ResponseParsingError_1 = __importDefault(require("./core/errors/ResponseParsingError"));
var DataList_1 = require("./mixvel/DataList");
var datalist_1 = require("./mixvel/constants/datalist");
var mixvelRequestManager = new MixvelRequestManager_1.MixvelRequestManager(new MixvelRequestManager_1.MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints), new ObjectToXmlConversionStrategy_1.ObjectToXmlConversionStrategy());
var mixvelResponseManager = new MixvelResponseManager_1.MixvelResponseManager(require('./mixvel/config/responses').allowedNodeNames, new XmlToObjectConversionStrategy_1.XmlToObjectConversionStrategy());
function getAuthRequest(props) {
    var paramsOrError = Auth_1.AuthParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createAuthRequest(paramsOrError.getValue()));
}
exports.getAuthRequest = getAuthRequest;
function getSearchRequest(props) {
    var paramsOrError = Search_1.SearchParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createSearchRequest(paramsOrError.getValue()));
}
exports.getSearchRequest = getSearchRequest;
function getPriceRequest(props) {
    var paramsOrError = Price_1.PriceParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createPriceRequest(paramsOrError.getValue()));
}
exports.getPriceRequest = getPriceRequest;
function getFareRulesRequest(props) {
    var paramsOrError = Price_1.PriceParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createFareRulesRequest(paramsOrError.getValue()));
}
exports.getFareRulesRequest = getFareRulesRequest;
/**
 * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 */
function getBookRequest(props) {
    var paramsOrError = Book_1.BookParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createBookRequest(paramsOrError.getValue()));
}
exports.getBookRequest = getBookRequest;
function getOrderRetrieveRequest(props) {
    var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createOrderRetrieveRequest(paramsOrError.getValue()));
}
exports.getOrderRetrieveRequest = getOrderRetrieveRequest;
function getTicketIssueRequest(props) {
    var paramsOrError = TicketIssue_1.TicketIssueParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createTicketIssueRequest(paramsOrError.getValue()));
}
exports.getTicketIssueRequest = getTicketIssueRequest;
function getOrderCancelRequest(props) {
    var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createOrderCancelRequest(paramsOrError.getValue()));
}
exports.getOrderCancelRequest = getOrderCancelRequest;
function getServiceListRequest(props) {
    var paramsOrError = Price_1.PriceParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createServiceListRequest(paramsOrError.getValue()));
}
exports.getServiceListRequest = getServiceListRequest;
function getRefundCalculationRequest(props) {
    var paramsOrError = OrderRetrieve_1.OrderRetrieveParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createRefundCalculationRequest(paramsOrError.getValue()));
}
exports.getRefundCalculationRequest = getRefundCalculationRequest;
function getRefundRequest(props) {
    var paramsOrError = Refund_1.RefundParams.create(props);
    return paramsOrError.isFailure && paramsOrError.error
        ? Result_1.Result.fail(paramsOrError.error)
        : Result_1.Result.ok(mixvelRequestManager.createRefundRequest(paramsOrError.getValue()));
}
exports.getRefundRequest = getRefundRequest;
/**
 * @param {string|{}} data - response XML or JSON with errors
 */
function getResponse(data) {
    if (typeof data !== "string" && data.errors && data.errors.length) {
        return Promise.resolve().then(function () { return Result_1.Result.fail(data.title); });
    }
    if (typeof data === "string") {
        return mixvelResponseManager.getResponse(data)
            .then(function (mixvelResponse) {
            return Result_1.Result.ok(mixvelResponse);
        })
            .catch(function (err) { return Result_1.Result.fail(err.message); });
    }
    return Promise.reject(new ResponseParsingError_1.default('Unknown input format'));
}
exports.getResponse = getResponse;
function extractDataLists(dataListSource) {
    var dl = {};
    for (var _i = 0, _a = Object.entries(datalist_1.allowedDataLists); _i < _a.length; _i++) {
        var _b = _a[_i], keyTitle = _b[0], dataListTitle = _b[1];
        dl[keyTitle] = DataList_1.DataList.create(dataListTitle, dataListSource);
    }
    return dl;
}
exports.extractDataLists = extractDataLists;
