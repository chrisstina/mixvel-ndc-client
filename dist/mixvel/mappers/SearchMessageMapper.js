"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var Mixvel_AirShoppingRQ_1 = require("../messages/Mixvel_AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var DateTime = require('luxon').DateTime;
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params) {
        this.params = params;
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        var mixvelRequestMessage = new Mixvel_AirShoppingRQ_1.Mixvel_AirShoppingRQ();
        this.params.originDestinations.forEach(function (od) {
            mixvelRequestMessage.addOriginDestination(od.from, od.to, DateTime.fromISO(od.dateRangeStart).toISODate(), DateTime.fromISO(od.dateRangeEnd).toISODate(), (0, cabin_1.toMixvel)(_this.params.cabin));
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            mixvelRequestMessage.addPax(id, (0, ptc_1.toMixvel)(ptc), age.toString());
        });
        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            mixvelRequestMessage.addCarrierCriteria(this.params.preferredCarriers);
        }
        return mixvelRequestMessage;
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
