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
exports.MixvelDataList = void 0;
var DataList_1 = require("../../core/response/DataList");
var MixvelDataList = /** @class */ (function (_super) {
    __extends(MixvelDataList, _super);
    function MixvelDataList(entityName, items) {
        var _this = _super.call(this, entityName, items) || this;
        try {
            _this.list = items[0]["".concat(entityName, "List")][0][entityName];
        }
        catch (e) {
            console.error("Failed to find ".concat(entityName, " DataList: ").concat(e.stack));
            _this.list = [];
        }
        return _this;
    }
    MixvelDataList.create = function (dataListTitle, dataListSource) {
        return new MixvelDataList(dataListTitle, dataListSource);
    };
    MixvelDataList.prototype.findByReference = function (entityRef) {
        var _this = this;
        return this.list.find(function (entity) { return entity["".concat(_this.entityName, "ID")][0] === entityRef; });
    };
    return MixvelDataList;
}(DataList_1.DataList));
exports.MixvelDataList = MixvelDataList;
