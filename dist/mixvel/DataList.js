"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataList = void 0;
var DataList = /** @class */ (function () {
    function DataList(entityName, items) {
        this.entityName = entityName;
        try {
            this.list = items[0]["".concat(entityName, "List")][0][entityName];
        }
        catch (e) {
            console.error("Failed to find ".concat(entityName, " DataList: ").concat(e.stack));
            this.list = [];
        }
    }
    DataList.create = function (dataListTitle, dataListSource) {
        return new DataList(dataListTitle, dataListSource);
    };
    DataList.prototype.findByReference = function (entityRef) {
        var _this = this;
        return this.list.find(function (entity) { return entity["".concat(_this.entityName, "ID")][0] === entityRef; });
    };
    return DataList;
}());
exports.DataList = DataList;
