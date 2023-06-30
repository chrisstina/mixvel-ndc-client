"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepriceMessageMapper = void 0;
var OrderReshopRQ_1 = require("../messages/OrderReshopRQ");
var RepriceMessageMapper = /** @class */ (function () {
    function RepriceMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    RepriceMessageMapper.prototype.map = function () {
        var message = new OrderReshopRQ_1.OrderReshopRQ(this.params.orderId);
        if (this.params.deleteOrderItems) {
            message.setDeleteOrderItems(this.params.deleteOrderItems);
        }
        message.addParty(this.credentials);
        return message;
    };
    return RepriceMessageMapper;
}());
exports.RepriceMessageMapper = RepriceMessageMapper;
