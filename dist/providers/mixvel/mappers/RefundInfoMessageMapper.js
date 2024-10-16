"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundInfoMessageMapper = void 0;
var Mixvel_OrderReshopRQ_1 = require("../messages/Mixvel_OrderReshopRQ");
var RefundInfoMessageMapper = /** @class */ (function () {
    function RefundInfoMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_OrderReshopRQ_1.Mixvel_OrderReshopRQ(this.params.orderId);
    }
    RefundInfoMessageMapper.prototype.map = function () {
        this.setOrderToCancel(this.params.orderItemIds);
        return this.message;
    };
    RefundInfoMessageMapper.prototype.setOrderToCancel = function (orderItems) {
        var uniqueOrderIds = new Set();
        orderItems.forEach(function (_a) {
            var orderId = _a[0];
            return uniqueOrderIds.add(orderId);
        });
        this.message.UpdateOrder = {
            CancelOrder: { OrderRefID: Array.from(uniqueOrderIds.values()) },
        };
    };
    return RefundInfoMessageMapper;
}());
exports.RefundInfoMessageMapper = RefundInfoMessageMapper;
