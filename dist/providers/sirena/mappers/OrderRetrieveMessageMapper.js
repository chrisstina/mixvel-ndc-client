"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRetrieveMessageMapper = void 0;
var OrderRetrieveRQ_1 = require("../messages/OrderRetrieveRQ");
var OrderRetrieveMessageMapper = /** @class */ (function () {
    function OrderRetrieveMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OrderRetrieveRQ_1.OrderRetrieveRQ(this.params.orderId, this.params.offerOwner || "");
        this.message.addParty(this.credentials);
    }
    OrderRetrieveMessageMapper.prototype.map = function () {
        return this.message;
    };
    return OrderRetrieveMessageMapper;
}());
exports.OrderRetrieveMessageMapper = OrderRetrieveMessageMapper;
