"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelMessageMapper = void 0;
var OrderCancelRQ_1 = require("../messages/OrderCancelRQ");
var OrderCancelMessageMapper = /** @class */ (function () {
    function OrderCancelMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    OrderCancelMessageMapper.prototype.map = function () {
        var ticketMeOrderCancelRQ = new OrderCancelRQ_1.OrderCancelRQ(this.params.orderId, this.params.offerOwner || '');
        ticketMeOrderCancelRQ.addParty(this.credentials);
        return ticketMeOrderCancelRQ;
    };
    return OrderCancelMessageMapper;
}());
exports.OrderCancelMessageMapper = OrderCancelMessageMapper;
