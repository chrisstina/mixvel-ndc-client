"use strict";
/*
 * Copyright (c) 2021
 */
var assert = require('assert');
var DataList = /** @class */ (function () {
    function DataList(entityName, items) {
        try {
            this.list = items[0]["".concat(entityName, "List")][0][entityName];
            assert(this.list, "".concat(entityName, " is not present in the DataLists"));
            this.entityName = entityName;
        }
        catch (e) {
            console.error("Failed to find ".concat(entityName, " DataList: ").concat(e.stack));
        }
    }
    DataList.prototype.findByReference = function (entityRef) {
        var _this = this;
        return this.list.find(function (entity) { return entity["".concat(_this.entityName, "ID")][0] === entityRef; });
    };
    return DataList;
}());
module.exports = DataList;
