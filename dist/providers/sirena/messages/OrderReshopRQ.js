"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderReshopRQ = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var OrderReshopRQ = /** @class */ (function (_super) {
    __extends(OrderReshopRQ, _super);
    function OrderReshopRQ(orderId) {
        var _this = _super.call(this) || this;
        _this.Query = [
            {
                OrderID: [{ _: orderId }],
            },
        ];
        return _this;
    }
    Object.defineProperty(OrderReshopRQ.prototype, "nodeName", {
        get: function () {
            return "OrderReshopRQ";
        },
        enumerable: false,
        configurable: true
    });
    OrderReshopRQ.prototype.setReprice = function () {
        this.Query[0]["Reprice"] = [{ _: "" }];
    };
    OrderReshopRQ.prototype.setDeleteOrderItems = function (orderItems) {
        this.Query[0]["Reshop"] = [{ OrderServicing: [] }];
        this.Query[0].Reshop[0].OrderServicing.push({
            Delete: [
                {
                    OrderItem: orderItems.map(function (id) {
                        return {
                            $: {
                                OrderItemID: id,
                            },
                        };
                    }),
                },
            ],
        });
    };
    return OrderReshopRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.OrderReshopRQ = OrderReshopRQ;
