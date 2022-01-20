"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefundRequest = exports.getRefundCalculationRequest = exports.getServiceListRequest = exports.getOrderCancelRequest = exports.getTicketIssueRequest = exports.getOrderRetrieveRequest = exports.getBookRequest = exports.getFareRulesRequest = exports.getPriceRequest = exports.getSearchRequest = exports.getAuthRequest = void 0;
var MixvelRequestManager_1 = require("./mixvel/MixvelRequestManager");
var XmlConversionStrategy_1 = require("./services/conversion/XmlConversionStrategy");
var parameters_1 = require("./request/parameters");
var SearchParamsValidator_1 = require("./request/validators/SearchParamsValidator");
var PriceParamsValidator_1 = require("./request/validators/PriceParamsValidator");
var OrderRetrieveParamsValidator_1 = require("./request/validators/OrderRetrieveParamsValidator");
var TicketIssueParamsValidator_1 = require("./request/validators/TicketIssueParamsValidator");
var BookParamsValidator_1 = require("./request/validators/BookParamsValidator");
var mixvelRequestManager = new MixvelRequestManager_1.MixvelRequestManager(new MixvelRequestManager_1.MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints), new XmlConversionStrategy_1.XmlConversionStrategy());
function getAuthRequest(props) {
    return parameters_1.AuthParams
        .create(props)
        .then(function (params) {
        return mixvelRequestManager.createAuthRequest(params);
    });
}
exports.getAuthRequest = getAuthRequest;
/**
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getSearchRequest(params) {
    SearchParamsValidator_1.SearchParamsValidator.validate(params);
    return mixvelRequestManager.createSearchRequest(params);
}
exports.getSearchRequest = getSearchRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getPriceRequest(params) {
    PriceParamsValidator_1.PriceParamsValidator.validate(params);
    return mixvelRequestManager.createPriceRequest(params);
}
exports.getPriceRequest = getPriceRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getFareRulesRequest(params) {
    PriceParamsValidator_1.PriceParamsValidator.validate(params);
    return mixvelRequestManager.createFareRulesRequest(params);
}
exports.getFareRulesRequest = getFareRulesRequest;
/**
 * @param {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getBookRequest(params) {
    BookParamsValidator_1.BookParamsValidator.validate(params);
    return mixvelRequestManager.createBookRequest(params);
}
exports.getBookRequest = getBookRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getOrderRetrieveRequest(params) {
    OrderRetrieveParamsValidator_1.OrderRetrieveParamsValidator.validate(params);
    return mixvelRequestManager.createOrderRetrieveRequest(params);
}
exports.getOrderRetrieveRequest = getOrderRetrieveRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getTicketIssueRequest(params) {
    TicketIssueParamsValidator_1.TicketIssueParamsValidator.validate(params);
    return mixvelRequestManager.createTicketIssueRequest(params);
}
exports.getTicketIssueRequest = getTicketIssueRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getOrderCancelRequest(params) {
    OrderRetrieveParamsValidator_1.OrderRetrieveParamsValidator.validate(params);
    return mixvelRequestManager.createOrderCancelRequest(params);
}
exports.getOrderCancelRequest = getOrderCancelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getServiceListRequest(params) {
    PriceParamsValidator_1.PriceParamsValidator.validate(params);
    return mixvelRequestManager.createServiceListRequest(params);
}
exports.getServiceListRequest = getServiceListRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getRefundCalculationRequest(params) {
    return mixvelRequestManager.createRefundCalculationRequest(params);
}
exports.getRefundCalculationRequest = getRefundCalculationRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
function getRefundRequest(params) {
    return mixvelRequestManager.createRefundRequest(params);
}
exports.getRefundRequest = getRefundRequest;
