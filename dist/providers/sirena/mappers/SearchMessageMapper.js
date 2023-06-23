"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var luxon_1 = require("luxon");
var preflevel_1 = require("../../../core/constants/preflevel");
var ptc_1 = require("../../../core/helpers/ptc");
var AirShoppingRQ_1 = require("../messages/AirShoppingRQ");
var cabin_1 = require("./dictionary/cabin");
var ptc_2 = require("./dictionary/ptc");
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new AirShoppingRQ_1.AirShoppingRQ();
        this.message.addParty(this.credentials);
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        this.setCabinPreference((0, cabin_1.toSirena)(this.params.cabin));
        if (this.params.onlyDirect) {
            this.setDirectPreference(preflevel_1.Preflevel.REQUIRED);
        }
        this.params.originDestinations.forEach(function (od) {
            _this.addOriginDestination(od.from, od.to, luxon_1.DateTime.fromJSDate(od.dateRangeStart).toISODate());
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc;
            _this.addPax(generatePaxId(id), (0, ptc_2.toSirena)(ptc));
        });
        if (ptc_1.PtcHelper.hasInfants(this.params)) {
            this.createInfantRefs();
        }
        // @todo this.params.preferredCarriers
        return this.message;
    };
    SearchMessageMapper.prototype.addPax = function (id, ptc) {
        this.message.DataLists[0].PassengerList[0].Passenger.push(new AirShoppingRQ_1.Pax(id, ptc));
    };
    SearchMessageMapper.prototype.createInfantRefs = function () {
        var infantRefs = this.message.DataLists[0].PassengerList[0].Passenger.filter(function (passenger) { return passenger.PTC[0]._ === ptc_2.SirenaPTC.INFANT; }).map(function (passenger) { return passenger.$.PassengerID; });
        this.message.DataLists[0].PassengerList[0].Passenger.forEach(function (passenger) {
            if (infantRefs.length > 0 && passenger.PTC[0]._ === ptc_2.SirenaPTC.ADULT) {
                passenger.attachInfant(infantRefs.pop());
            }
        });
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
            { Characteristic: [{ NonStopPreferences: [{ _: preference }] }] },
        ];
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
var generatePaxId = function (id) { return "T".concat(id); };
