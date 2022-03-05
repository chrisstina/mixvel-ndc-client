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
        var ticketMeReshopRQ = new OrderReshopRQ_1.OrderReshopRQ(this.params.orderId);
        ticketMeReshopRQ.addParty(this.credentials);
        return ticketMeReshopRQ;
    };
    return RepriceMessageMapper;
}());
exports.RepriceMessageMapper = RepriceMessageMapper;
