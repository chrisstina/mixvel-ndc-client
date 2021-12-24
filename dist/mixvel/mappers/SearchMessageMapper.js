"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var Mixvel_AirShoppingRQ_1 = require("../request/Mixvel_AirShoppingRQ");
var cabin_1 = require("../constants/cabin");
var ptc_1 = require("../constants/ptc");
var DateTime = require('luxon').DateTime;
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params) {
        this.params = params;
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        var mixvelRequestMessage = new Mixvel_AirShoppingRQ_1.Mixvel_AirShoppingRQ();
        this.params.originDestinations.forEach(function (od) {
            mixvelRequestMessage.addOriginDestination(od.from, od.to, DateTime.fromISO(od.dateRangeStart).toISODate(), DateTime.fromISO(od.dateRangeEnd).toISODate(), cabin_1.Cabin[_this.params.cabin] || cabin_1.Cabin.ECONOMY);
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            mixvelRequestMessage.addPax(id, ptc_1.PTC[ptc], age);
        });
        if (this.params.preferredCarriers) {
            mixvelRequestMessage.addCarrierCriteria(this.params.preferredCarriers);
        }
        return mixvelRequestMessage;
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
