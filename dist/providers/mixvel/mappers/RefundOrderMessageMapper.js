"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundOrderMessageMapper = void 0;
var Mixvel_OrderChangeRQ_1 = require("../messages/Mixvel_OrderChangeRQ");
var RefundOrderMessageMapper = /** @class */ (function () {
    function RefundOrderMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_OrderChangeRQ_1.Mixvel_OrderChangeRQ(this.params.orderId);
    }
    RefundOrderMessageMapper.prototype.map = function () {
        this.setItemsToDelete(this.params.orderItemIds);
        return this.message;
    };
    RefundOrderMessageMapper.prototype.setItemsToDelete = function (orderItems) {
        this.message.ChangeOrder = {
            UpdateOrderItem: {
                DeleteOrderItemList: orderItems.map(function (_a) {
                    var orderId = _a[0], orderItemId = _a[1];
                    return {
                        DeleteOrderItem: {
                            OrderID: orderId,
                            OrderItemID: orderItemId,
                        },
                    };
                }),
            },
        };
    };
    return RefundOrderMessageMapper;
}());
exports.RefundOrderMessageMapper = RefundOrderMessageMapper;
