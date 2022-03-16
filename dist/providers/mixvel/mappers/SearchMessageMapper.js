"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var DateTime = require('luxon').DateTime;
var Mixvel_AirShoppingRQ_1 = require("../messages/Mixvel_AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var preflevel_1 = require("../constants/preflevel");
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_AirShoppingRQ_1.Mixvel_AirShoppingRQ();
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        var connectionId;
        this.params.originDestinations.forEach(function (od) {
            _this.message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(_this.createOD(od.from, od.to, DateTime.fromJSDate(od.dateRangeStart).toISODate(), DateTime.fromJSDate(od.dateRangeEnd).toISODate(), (0, cabin_1.toMixvel)(_this.params.cabin), connectionId));
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            _this.message.Paxs.Pax.push(new Mixvel_AirShoppingRQ_1.Pax(id, (0, ptc_1.toMixvel)(ptc), age.toString()));
        });
        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            this.addCarrierCriteria(this.params.preferredCarriers);
        }
        if (this.params.onlyDirect) {
            connectionId = 'Connection-1'; // @todo
            this.addConnectionCriteria(connectionId, '1');
        }
        return this.message;
    };
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {MixvelCabin} cabinTypeCode
     * @param {string} connectionId
     * @return {OriginDestination}
     */
    SearchMessageMapper.prototype.createOD = function (originCode, destinationCode, dateRangeStart, dateRangeEnd, cabinTypeCode, connectionId) {
        var OD = new Mixvel_AirShoppingRQ_1.OriginDestination();
        if (connectionId) {
            OD.ConnectionPrefRefID = connectionId;
        }
        else {
            delete OD.ConnectionPrefRefID;
        }
        OD.OriginDepCriteria.DateRangeStart = dateRangeStart;
        OD.OriginDepCriteria.DateRangeEnd = dateRangeEnd;
        OD.OriginDepCriteria.IATA_LocationCode = originCode;
        OD.DestArrivalCriteria = { "IATA_LocationCode": destinationCode };
        OD.CabinType = { CabinTypeCode: cabinTypeCode, PrefLevel: { PrefLevelCode: preflevel_1.Preflevel.REQUIRED } };
        return OD;
    };
    SearchMessageMapper.prototype.addCarrierCriteria = function (allowedCarrierCodes) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({ 'CarrierCriteria': [] });
        }
        this.message.ShoppingCriteria[0].CarrierCriteria = [{
                "Carrier": allowedCarrierCodes.map(function (code) {
                    return {
                        "AirlineDesigCode": code
                    };
                })
            }];
    };
    SearchMessageMapper.prototype.addConnectionCriteria = function (connectionId, maxConnections) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({ 'ConnectionCriteria': [] });
        }
        this.message.ShoppingCriteria[0].ConnectionCriteria = [{
                "ConnectionPrefID": connectionId,
                "MaximumConnectionQty": maxConnections
            }];
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
