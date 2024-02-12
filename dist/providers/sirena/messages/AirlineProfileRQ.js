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
exports.AirlineProfileRQ = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
var AirlineProfileRQ = /** @class */ (function (_super) {
    __extends(AirlineProfileRQ, _super);
    function AirlineProfileRQ(airline) {
        var _this = _super.call(this) || this;
        _this.Query = { ProfileOwner: [{ _: airline }] };
        return _this;
    }
    Object.defineProperty(AirlineProfileRQ.prototype, "nodeName", {
        get: function () {
            return "AirlineProfileRQ";
        },
        enumerable: false,
        configurable: true
    });
    return AirlineProfileRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.AirlineProfileRQ = AirlineProfileRQ;
