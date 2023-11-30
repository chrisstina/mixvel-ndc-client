"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitOrderMessageMapper = void 0;
var Mixvel_OrderChangeRQ_1 = require("../messages/Mixvel_OrderChangeRQ");
var SplitOrderMessageMapper = /** @class */ (function () {
    function SplitOrderMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_OrderChangeRQ_1.Mixvel_OrderChangeRQ();
    }
    SplitOrderMessageMapper.prototype.map = function () {
        this.setItemsToSplit(this.params.splitOrderItems);
        this.message.setMixOrder(this.params.orderId);
        return this.message;
    };
    SplitOrderMessageMapper.prototype.setItemsToSplit = function (orderItems) {
        this.message.ChangeOrder = {
            SplitOrder: orderItems.map(function (_a) {
                var orderItemId = _a.orderItemId, paxRefs = _a.paxRefs;
                return {
                    OrderID: orderItemId,
                    PaxRefID: paxRefs,
                };
            }),
        };
    };
    return SplitOrderMessageMapper;
}());
exports.SplitOrderMessageMapper = SplitOrderMessageMapper;
