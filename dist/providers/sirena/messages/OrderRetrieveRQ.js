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
exports.OrderRetrieveRQ = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var OrderRetrieveRQ = /** @class */ (function (_super) {
    __extends(OrderRetrieveRQ, _super);
    function OrderRetrieveRQ(orderId, offerOwner) {
        var _this = _super.call(this) || this;
        _this.Query = [
            {
                Filters: [{ OrderID: { $: { Owner: offerOwner }, _: orderId } }],
            },
        ];
        return _this;
    }
    Object.defineProperty(OrderRetrieveRQ.prototype, "nodeName", {
        get: function () {
            return "OrderRetrieveRQ";
        },
        enumerable: false,
        configurable: true
    });
    return OrderRetrieveRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.OrderRetrieveRQ = OrderRetrieveRQ;
