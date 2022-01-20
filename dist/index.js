"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefundRequest = exports.getRefundCalculationRequest = exports.getServiceListRequest = exports.getOrderCancelRequest = exports.getTicketIssueRequest = exports.getOrderRetrieveRequest = exports.getBookRequest = exports.getFareRulesRequest = exports.getPriceRequest = exports.getSearchRequest = exports.getAuthRequest = void 0;
var MixvelRequestManager_1 = require("./mixvel/MixvelRequestManager");
var Result_1 = require("./core/Result");
var XmlConversionStrategy_1 = require("./services/conversion/XmlConversionStrategy");
var Auth_1 = require("./request/parameters/Auth");
var Search_1 = require("./request/parameters/Search");
var Price_1 = require("./request/parameters/Price");
var OrderRetrieve_1 = require("./request/parameters/OrderRetrieve");
var Book_1 = require("./request/parameters/Book");
var TicketIssue_1 = require("./request/parameters/TicketIssue");
var Refund_1 = require("./request/parameters/Refund");
var mixvelRequestManager = new MixvelRequestManager_1.MixvelRequestManager(new MixvelRequestManager_1.MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints), new XmlConversionStrategy_1.XmlConversionStrategy());
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