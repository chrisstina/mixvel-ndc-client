"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundOrderMessageMapper = void 0;
var Mixvel_OrderChangeRQ_1 = require("../messages/Mixvel_OrderChangeRQ");
var RefundOrderMessageMapper = /** @class */ (function () {
    function RefundOrderMessageMapper(params) {
        this.params = params;
    }
    RefundOrderMessageMapper.prototype.map = function () {
        var rq = new Mixvel_OrderChangeRQ_1.Mixvel_OrderChangeRQ(this.params.orderId);
        rq.setItemsToDelete(this.params.orderItemIds);
        return rq;
    };
    return RefundOrderMessageMapper;
}());
exports.RefundOrderMessageMapper = RefundOrderMessageMapper;
