"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtcHelper = void 0;
var Search_1 = require("../request/parameters/Search");
var ptc_1 = require("../constants/ptc");
var PtcHelper = /** @class */ (function () {
    function PtcHelper() {
    }
    PtcHelper.isInfant = function (traveler) {
        return traveler.ptc === ptc_1.Ptc.INFANT;
    };
    PtcHelper.hasInfants = function (rq) {
        if (rq instanceof Search_1.SearchParams) {
            return rq.travelers.some(function (traveler) { return PtcHelper.isInfant(traveler); });
        }
        return rq.passengers.some(function (traveler) { return PtcHelper.isInfant(traveler); });
    };
    return PtcHelper;
}());
exports.PtcHelper = PtcHelper;
