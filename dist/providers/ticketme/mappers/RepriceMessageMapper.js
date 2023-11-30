"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepriceMessageMapper = void 0;
var OrderReshopRQ_1 = require("../messages/OrderReshopRQ");
var RepriceMessageMapper = /** @class */ (function () {
    function RepriceMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OrderReshopRQ_1.OrderReshopRQ(this.params.orderId);
        this.message.addParty(this.credentials);
    }
    RepriceMessageMapper.prototype.map = function () {
        return this.message;
    };
    return RepriceMessageMapper;
}());
exports.RepriceMessageMapper = RepriceMessageMapper;
