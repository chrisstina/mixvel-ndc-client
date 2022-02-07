"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var AirShoppingRQ_1 = require("../messages/AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var preflevel_1 = require("../constants/preflevel");
var DateTime = require('luxon').DateTime;
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    SearchMessageMapper.prototype.map = function () {
        var ticketMeAirShoppingRQ = new AirShoppingRQ_1.AirShoppingRQ();
        ticketMeAirShoppingRQ.addParty(this.credentials);
        ticketMeAirShoppingRQ.setCabinPreference((0, cabin_1.toTicketMe)(this.params.cabin));
        if (this.params.onlyDirect) {
            ticketMeAirShoppingRQ.setDirectPreference(preflevel_1.Preflevel.PREFERRED);
        }
        this.params.originDestinations.forEach(function (od) {
            ticketMeAirShoppingRQ.addOriginDestination(od.from, od.to, DateTime.fromJSDate(od.dateRangeStart).toISODate());
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc;
            ticketMeAirShoppingRQ.addPax(generatePaxId(id), (0, ptc_1.toTicketMe)(ptc));
        });
        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            ticketMeAirShoppingRQ.addCarrierFilters(this.params.preferredCarriers, preflevel_1.Preflevel.PREFERRED);
        }
        return ticketMeAirShoppingRQ;
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
var generatePaxId = function (id) { return "PAX".concat(id); };
