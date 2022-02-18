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
exports.TicketMeDataList = void 0;
var DataList_1 = require("../../core/response/DataList");
var defaults_1 = require("./config/defaults");
var TicketMeDataList = /** @class */ (function (_super) {
    __extends(TicketMeDataList, _super);
    function TicketMeDataList(entityName, items, dataListEntityName) {
        var _this = _super.call(this, entityName, items) || this;
        try {
            _this.list = items[0]["".concat(defaults_1.DEFAULT_NAMESPACE, ":").concat(entityName, "List")][0]["".concat(defaults_1.DEFAULT_NAMESPACE, ":").concat(dataListEntityName || entityName)];
        }
        catch (e) {
            console.error("Failed to find ".concat(entityName, " DataList: ").concat(e.stack));
            _this.list = [];
        }
        return _this;
    }
    TicketMeDataList.create = function (dataListTitle, dataListSource, dataListEntityName) {
        return new TicketMeDataList(dataListTitle, dataListSource, dataListEntityName);
    };
    TicketMeDataList.prototype.findByReference = function (entityRef, keyName) {
        var _this = this;
        return this.list.find(function (entity) { return entity.$[keyName || "".concat(_this.entityName, "Key")] === entityRef; });
    };
    return TicketMeDataList;
}(DataList_1.DataList));
exports.TicketMeDataList = TicketMeDataList;
