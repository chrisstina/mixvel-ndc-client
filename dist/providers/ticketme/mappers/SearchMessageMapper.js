"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var DateTime = require("luxon").DateTime;
var AirShoppingRQ_1 = require("../messages/AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var preflevel_1 = require("../constants/preflevel");
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new AirShoppingRQ_1.AirShoppingRQ();
        this.message.addParty(this.credentials);
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        this.setCabinPreference((0, cabin_1.toTicketMe)(this.params.cabin));
        if (this.params.onlyDirect) {
            this.setDirectPreference(preflevel_1.Preflevel.PREFERRED);
        }
        this.params.originDestinations.forEach(function (od) {
            _this.addOriginDestination(od.from, od.to, DateTime.fromJSDate(od.dateRangeStart).toISODate());
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc;
            _this.addPax(generatePaxId(id), (0, ptc_1.toTicketMe)(ptc));
        });
        if (this.params.preferredCarriers &&
            this.params.preferredCarriers.length > 0) {
            this.addCarrierFilters(this.params.preferredCarriers, preflevel_1.Preflevel.PREFERRED);
        }
        return this.message;
    };
    SearchMessageMapper.prototype.addPax = function (id, ptc) {
        this.message.DataLists[0].PassengerList[0].Passenger.push(new AirShoppingRQ_1.Pax(id, ptc));
    };
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    SearchMessageMapper.prototype.addOriginDestination = function (originCode, destinationCode, date) {
        var OD = new AirShoppingRQ_1.OriginDestination();
        OD.Arrival.push({ AirportCode: [{ _: destinationCode }] });
        OD.Departure.push({
            AirportCode: [{ _: originCode }],
            Date: [{ _: date }],
        });
        this.message.CoreQuery[0].OriginDestinations[0].OriginDestination.push(OD);
    };
    SearchMessageMapper.prototype.setCabinPreference = function (cabin) {
        this.message.Preference[0].CabinPreferences[0].CabinType[0].Code[0]._ =
            cabin;
    };
    SearchMessageMapper.prototype.setDirectPreference = function (preference) {
        this.message.Preference[0]["FlightPreferences"] = [
            { Characteristic: [{ DirectPreferences: [{ _: preference }] }] },
        ];
    };
    SearchMessageMapper.prototype.addCarrierFilters = function (carriers, level) {
        var airlines = carriers.map(function (carrier) {
            return {
                $: { PreferencesLevel: level },
                AirlineID: [{ _: carrier }],
            };
        });
        if (!this.message.Preference[0].AirlinePreferences) {
            this.message.Preference[0]["AirlinePreferences"] = [];
        }
        this.message.Preference[0].AirlinePreferences.push({ Airline: airlines });
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
var generatePaxId = function (id) { return "PAX".concat(id); };
