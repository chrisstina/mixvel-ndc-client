"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMessageMapper = void 0;
var DateTime = require("luxon").DateTime;
var preflevel_1 = require("../../../core/constants/preflevel");
var Mixvel_AirShoppingRQ_1 = require("../messages/Mixvel_AirShoppingRQ");
var ptc_1 = require("./dictionary/ptc");
var cabin_1 = require("./dictionary/cabin");
var pricingoption_1 = require("./dictionary/pricingoption");
var SearchMessageMapper = /** @class */ (function () {
    function SearchMessageMapper(params) {
        this.params = params;
    }
    SearchMessageMapper.prototype.map = function () {
        var _this = this;
        var message = new Mixvel_AirShoppingRQ_1.Mixvel_AirShoppingRQ();
        // mind the order of fields!
        this.params.originDestinations.forEach(function (od) {
            message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(_this.createOD(od.from, od.to, DateTime.fromJSDate(od.dateRangeStart).toISODate(), DateTime.fromJSDate(od.dateRangeEnd).toISODate(), (0, cabin_1.toMixvel)(_this.params.cabin)));
        });
        this.params.travelers.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            // @todo maybe autogenerate id?
            message.Paxs.Pax.push(new Mixvel_AirShoppingRQ_1.Pax(id, (0, ptc_1.toMixvel)(ptc), age.toString()));
        });
        if (this.params.preferredCarriers &&
            this.params.preferredCarriers.length > 0) {
            this.addCarrierCriteria(message, this.params.preferredCarriers);
        }
        else {
            // remove unused ref field
            message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(function (od) { return delete od.CarrierPrefRefID; });
        }
        if (this.params.onlyDirect) {
            this.addConnectionCriteria(message, 0);
        }
        else {
            // remove unused ref field
            message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(function (od) { return delete od.ConnectionPrefRefID; });
        }
        if (this.params.preferredRBD) {
            this.addFlightCriteria(message, {
                allowMixing: false,
                RBDCodes: this.params.preferredRBD,
            });
        }
        if (this.params.pricingOption) {
            this.addPricingCriteria(message, this.params.pricingOption);
        }
        if (this.params.contract3D) {
            this.addProgramCriteria(message, this.params.contract3D);
        }
        return message;
    };
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {MixvelCabin} cabinTypeCode
     * @return {OriginDestination}
     */
    SearchMessageMapper.prototype.createOD = function (originCode, destinationCode, dateRangeStart, dateRangeEnd, cabinTypeCode) {
        var OD = new Mixvel_AirShoppingRQ_1.OriginDestination();
        OD.OriginDepCriteria.DateRangeStart = dateRangeStart;
        OD.OriginDepCriteria.DateRangeEnd = dateRangeEnd;
        OD.OriginDepCriteria.IATA_LocationCode = originCode;
        OD.DestArrivalCriteria = { IATA_LocationCode: destinationCode };
        OD.CabinType = {
            CabinTypeCode: cabinTypeCode,
            PrefLevel: { PrefLevelCode: preflevel_1.Preflevel.REQUIRED },
        };
        return OD;
    };
    SearchMessageMapper.prototype.addCarrierCriteria = function (message, allowedCarrierCodes) {
        var carrierPrefRefId = this.generateCarrierPrefId();
        if (message.ShoppingCriteria.length === 0) {
            message.ShoppingCriteria.push({ CarrierCriteria: [] });
        }
        message.ShoppingCriteria[0].CarrierCriteria = [
            {
                Carrier: allowedCarrierCodes.map(function (code) {
                    return { AirlineDesigCode: code };
                }),
                CarrierPrefID: carrierPrefRefId,
            },
        ];
        message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(function (od) { return (od.CarrierPrefRefID = carrierPrefRefId); });
    };
    SearchMessageMapper.prototype.addConnectionCriteria = function (message, maxConnections) {
        var connectionId = this.generateConnectionId();
        if (message.ShoppingCriteria.length === 0) {
            message.ShoppingCriteria.push({ ConnectionCriteria: [] });
        }
        message.ShoppingCriteria[0].ConnectionCriteria = [
            {
                ConnectionPrefID: connectionId,
                MaximumConnectionQty: maxConnections,
            },
        ];
        message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.forEach(function (od) { return (od.ConnectionPrefRefID = connectionId); });
    };
    SearchMessageMapper.prototype.addFlightCriteria = function (message, rbdCriteria) {
        if (message.ShoppingCriteria.length === 0) {
            message.ShoppingCriteria.push({ FlightCriteria: [] });
        }
        message.ShoppingCriteria[0].FlightCriteria = [
            {
                RBD: {
                    MixRBDInd: rbdCriteria.allowMixing,
                    RBD_Code: rbdCriteria.RBDCodes,
                },
            },
        ];
    };
    SearchMessageMapper.prototype.addPricingCriteria = function (message, pricingOption) {
        if (message.ShoppingCriteria.length === 0) {
            message.ShoppingCriteria.push({ PricingMethodCriteria: [] });
        }
        message.ShoppingCriteria[0].PricingMethodCriteria = [
            {
                BestPricingOptionText: (0, pricingoption_1.toMixvel)(pricingOption),
            },
        ];
    };
    SearchMessageMapper.prototype.addProgramCriteria = function (message, contract) {
        if (message.ShoppingCriteria.length === 0) {
            message.ShoppingCriteria.push({ ProgramCriteria: [] });
        }
        var criterion = {};
        if (contract.clientCode) {
            criterion.ProgramContract = [];
            criterion.ProgramContract.push({ ContractID: contract.clientCode });
        }
        if (contract.agencyCode) {
            criterion.ProgramAccount = [];
            criterion.ProgramAccount.push({ AccountID: contract.agencyCode }); // <- 3d.agencyCode
        }
        if (contract.contractType) {
            criterion.TypeCode = contract.contractType;
        }
        message.ShoppingCriteria[0].ProgramCriteria = [criterion];
    };
    SearchMessageMapper.prototype.generateConnectionId = function () {
        return "Connection-1";
    };
    SearchMessageMapper.prototype.generateCarrierPrefId = function () {
        return "Carrier-1";
    };
    return SearchMessageMapper;
}());
exports.SearchMessageMapper = SearchMessageMapper;
