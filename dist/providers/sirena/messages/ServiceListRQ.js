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
exports.ServiceListRQ = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var ServiceListRQ = /** @class */ (function (_super) {
    __extends(ServiceListRQ, _super);
    function ServiceListRQ(query, dataLists) {
        var _this = _super.call(this) || this;
        _this.Query = query;
        if (dataLists) {
            _this.DataLists = dataLists;
        }
        return _this;
    }
    Object.defineProperty(ServiceListRQ.prototype, "nodeName", {
        get: function () {
            return "ServiceListRQ";
        },
        enumerable: false,
        configurable: true
    });
    return ServiceListRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.ServiceListRQ = ServiceListRQ;
