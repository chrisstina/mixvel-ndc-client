"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderCancelRequest = exports.getTicketIssueRequest = exports.getOrderRetrieveRequest = exports.getBookRequest = exports.getPriceRequest = exports.getSearchRequest = exports.getAuthRequest = void 0;
var MixvelRequest_1 = require("./mixvel/MixvelRequest");
var MixvelAppData_1 = require("./mixvel/MixvelAppData");
var XmlConversionStrategy_1 = require("./services/conversion/XmlConversionStrategy");
var MixvelAuthAppData_1 = require("./mixvel/MixvelAuthAppData");
var SearchMessageMapper_1 = require("./mixvel/mappers/SearchMessageMapper");
var BookMessageMapper_1 = require("./mixvel/mappers/BookMessageMapper");
var Mixvel_OfferPriceRQ_1 = require("./mixvel/request/Mixvel_OfferPriceRQ");
var Mixvel_OrderRetrieveRQ_1 = require("./mixvel/request/Mixvel_OrderRetrieveRQ");
var ChangeOrderMessageMapper_1 = require("./mixvel/mappers/ChangeOrderMessageMapper");
var Mixvel_OrderCancelRQ_1 = require("./mixvel/request/Mixvel_OrderCancelRQ");
var toXML = new XmlConversionStrategy_1.XmlConversionStrategy();
function createMixvelRequest(rq) {
    var request = new MixvelRequest_1.MixvelRequest(new MixvelAppData_1.MixvelAppData(rq), toXML);
    request.url = rq.endpoint;
    return request;
}
/**
 * @param {AuthParams} rq
 */
function getAuthRequest(rq) {
    var request = new MixvelRequest_1.MixvelRequest(new MixvelAuthAppData_1.MixvelAuthAppData(rq.login, rq.password, rq.structureId), toXML);
    request.url = 'api/Accounts/login';
    return request;
}
exports.getAuthRequest = getAuthRequest;
function getSearchRequest(params) {
    return createMixvelRequest(new SearchMessageMapper_1.SearchMessageMapper(params).map());
}
exports.getSearchRequest = getSearchRequest;
function getPriceRequest(params) {
    return createMixvelRequest(new Mixvel_OfferPriceRQ_1.Mixvel_OfferPriceRQ(params.offerId, params.offerItemIds));
}
exports.getPriceRequest = getPriceRequest;
function getBookRequest(params) {
    return createMixvelRequest(new BookMessageMapper_1.BookMessageMapper(params).map());
}
exports.getBookRequest = getBookRequest;
function getOrderRetrieveRequest(params) {
    return createMixvelRequest(new Mixvel_OrderRetrieveRQ_1.Mixvel_OrderRetrieveRQ(params.orderId));
}
exports.getOrderRetrieveRequest = getOrderRetrieveRequest;
function getTicketIssueRequest(params) {
    return createMixvelRequest(new ChangeOrderMessageMapper_1.ChangeOrderMessageMapper(params).map());
}
exports.getTicketIssueRequest = getTicketIssueRequest;
function getOrderCancelRequest(params) {
    return createMixvelRequest(new Mixvel_OrderCancelRQ_1.Mixvel_OrderCancelRQ(params.orderId));
}
exports.getOrderCancelRequest = getOrderCancelRequest;
