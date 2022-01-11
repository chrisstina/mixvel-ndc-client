"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderCancelRequest = exports.getTicketIssueRequest = exports.getOrderRetrieveRequest = exports.getBookRequest = exports.getPriceRequest = exports.getSearchRequest = exports.getAuthRequest = void 0;
var MixvelRequestManager_1 = require("./mixvel/MixvelRequestManager");
var XmlConversionStrategy_1 = require("./services/conversion/XmlConversionStrategy");
var SearchParamsValidator_1 = require("./request/validators/SearchParamsValidator");
var AuthParamsValidator_1 = require("./request/validators/AuthParamsValidator");
var PriceParamsValidator_1 = require("./request/validators/PriceParamsValidator");
var OrderRetrieveParamsValidator_1 = require("./request/validators/OrderRetrieveParamsValidator");
var TicketIssueParamsValidator_1 = require("./request/validators/TicketIssueParamsValidator");
var BookParamsValidator_1 = require("./request/validators/BookParamsValidator");
var toXML = new XmlConversionStrategy_1.XmlConversionStrategy();
var mixvelRequestManager = new MixvelRequestManager_1.MixvelRequestManager(toXML);
function getAuthRequest(props) {
    AuthParamsValidator_1.AuthParamsValidator.validate(props);
    return mixvelRequestManager.createAuthRequest(props);
}
exports.getAuthRequest = getAuthRequest;
function getSearchRequest(props) {
    SearchParamsValidator_1.SearchParamsValidator.validate(props);
    return mixvelRequestManager.createSearchRequest(props);
}
exports.getSearchRequest = getSearchRequest;
function getPriceRequest(props) {
    PriceParamsValidator_1.PriceParamsValidator.validate(props);
    return mixvelRequestManager.createPriceRequest(props);
}
exports.getPriceRequest = getPriceRequest;
function getBookRequest(props) {
    BookParamsValidator_1.BookParamsValidator.validate(props);
    return mixvelRequestManager.createBookRequest(props);
}
exports.getBookRequest = getBookRequest;
function getOrderRetrieveRequest(params) {
    OrderRetrieveParamsValidator_1.OrderRetrieveParamsValidator.validate(params);
    return mixvelRequestManager.createOrderRetrieveRequest(params);
}
exports.getOrderRetrieveRequest = getOrderRetrieveRequest;
function getTicketIssueRequest(params) {
    TicketIssueParamsValidator_1.TicketIssueParamsValidator.validate(params);
    return mixvelRequestManager.createTicketIssueRequest(params);
}
exports.getTicketIssueRequest = getTicketIssueRequest;
function getOrderCancelRequest(params) {
    OrderRetrieveParamsValidator_1.OrderRetrieveParamsValidator.validate(params);
    return mixvelRequestManager.createOrderCancelRequest(params);
}
exports.getOrderCancelRequest = getOrderCancelRequest;
