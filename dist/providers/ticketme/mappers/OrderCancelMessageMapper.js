"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelMessageMapper = void 0;
var OrderCancelRQ_1 = require("../messages/OrderCancelRQ");
var OrderCancelMessageMapper = /** @class */ (function () {
    function OrderCancelMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OrderCancelRQ_1.OrderCancelRQ(this.params.orderId, this.params.offerOwner || '');
        this.message.addParty(this.credentials);
    }
    OrderCancelMessageMapper.prototype.map = function () {
        return this.message;
    };
    return OrderCancelMessageMapper;
}());
exports.OrderCancelMessageMapper = OrderCancelMessageMapper;
