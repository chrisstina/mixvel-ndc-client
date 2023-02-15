"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataList = void 0;
var DataList = /** @class */ (function () {
    function DataList(entityName, items) {
        this.entityName = entityName;
    }
    DataList.create = function (dataListTitle, dataListSource) {
        return new DataList(dataListTitle, dataListSource);
    };
    DataList.prototype.findByReference = function (entityRef) {
        var _this = this;
        return this.list.find(function (entity) {
            return entity["".concat(_this.entityName, "ID")][0] === entityRef;
        });
    };
    return DataList;
}());
exports.DataList = DataList;
