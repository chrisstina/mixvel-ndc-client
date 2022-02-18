"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRetrieveMessageMapper = void 0;
var OrderRetrieveRQ_1 = require("../messages/OrderRetrieveRQ");
var OrderRetrieveMessageMapper = /** @class */ (function () {
    function OrderRetrieveMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    OrderRetrieveMessageMapper.prototype.map = function () {
        var ticketMeOfferPriceRQ = new OrderRetrieveRQ_1.OrderRetrieveRQ(this.params.orderId, this.params.offerOwner || '');
        ticketMeOfferPriceRQ.addParty(this.credentials);
        return ticketMeOfferPriceRQ;
    };
    return OrderRetrieveMessageMapper;
}());
exports.OrderRetrieveMessageMapper = OrderRetrieveMessageMapper;
