"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var DateTime = require('luxon').DateTime;
var Mixvel_AirShoppingRQ_1 = require("../messages/Mixvel_AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var pricingoption_1 = require("./dictionary/pricingoption");
var preflevel_1 = require("../constants/preflevel");
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_AirShoppingRQ_1.Mixvel_AirShoppingRQ();
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        // mind the order of fields!
        var connectionId = this.generateConnectionId();
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
        if (connectionId) {
            this.addConnectionCriteria(connectionId, '1');
        }
        if (this.params.pricingOption) {
            this.addPricingCriteria(this.params.pricingOption);
        }
        if (this.params.contract3D) {
            this.addProgramCriteria(this.params.contract3D);
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
    SearchMessageMapper.prototype.addPricingCriteria = function (pricingOption) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({ 'PricingMethodCriteria': [] });
        }
        this.message.ShoppingCriteria[0].PricingMethodCriteria = [{
                "BestPricingOptionText": (0, pricingoption_1.toMixvel)(pricingOption)
            }];
    };
    SearchMessageMapper.prototype.addProgramCriteria = function (contract) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({ 'ProgramCriteria': [] });
        }
        var criterion = {};
        if (contract.contractNumber) {
            criterion.ProgramContract = [];
            criterion.ProgramContract.push({ ContractID: contract.contractNumber });
        }
        if (contract.clientCode) {
            criterion.ProgramAccount = [];
            criterion.ProgramAccount.push({ AccountID: contract.clientCode });
        }
        if (contract.contractType) {
            criterion.TypeCode = contract.contractType;
        }
        this.message.ShoppingCriteria[0].ProgramCriteria = [criterion];
    };
    SearchMessageMapper.prototype.generateConnectionId = function () {
        if (this.params.onlyDirect) {
            return 'Connection-1';
        }
        return undefined;
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
