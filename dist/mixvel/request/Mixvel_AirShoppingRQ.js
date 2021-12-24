"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_AirShoppingRQ = exports.OriginDestination = void 0;
var preflevel_1 = require("../constants/preflevel");
var ptc_1 = require("../constants/ptc");
var OriginDestination = /** @class */ (function () {
    function OriginDestination() {
        this.CabinType = {
            "CabinTypeCode": "",
            "PrefLevel": { "PrefLevelCode": "" }
        };
        this.DestArrivalCriteria = {
            "IATA_LocationCode": ""
        };
        this.OriginDepCriteria = {
            "DateRangeStart": "",
            "DateRangeEnd": "",
            "IATA_LocationCode": ""
        };
    }
    return OriginDestination;
}());
exports.OriginDestination = OriginDestination;
var Pax = /** @class */ (function () {
    function Pax(id, ptc, age) {
        if (ptc === void 0) { ptc = ptc_1.PTC.ADULT; }
        // mind the property order!
        if (age) {
            this.AgeMeasure = age;
        }
        this.PaxID = id;
        this.PTC = ptc;
    }
    return Pax;
}());
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
var Mixvel_AirShoppingRQ = /** @class */ (function () {
    function Mixvel_AirShoppingRQ() {
        this["FlightRequest"] = {
            "FlightRequestOriginDestinationsCriteria": {
                "OriginDestCriteria": Array()
            }
        };
        this["Paxs"] = {
            "Pax": Array()
        };
        this.ShoppingCriteria = Array();
    }
    Object.defineProperty(Mixvel_AirShoppingRQ.prototype, "endpoint", {
        get: function () {
            return 'api/Order/airshopping';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_AirShoppingRQ.prototype, "xmlns", {
        get: function () {
            return { 'xmlns:shop': 'https://www.mixvel.com/API/XSD/Mixvel_AirShoppingRQ/1_01' };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_AirShoppingRQ.prototype, "nodeName", {
        get: function () {
            return "shop:Mixvel_AirShoppingRQ";
        },
        enumerable: false,
        configurable: true
    });
    Mixvel_AirShoppingRQ.prototype.addPax = function (id, ptc, age) {
        this.Paxs.Pax.push(new Pax(id, ptc, age));
    };
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {Cabin} cabinTypeCode
     */
    Mixvel_AirShoppingRQ.prototype.addOriginDestination = function (originCode, destinationCode, dateRangeStart, dateRangeEnd, cabinTypeCode) {
        var OD = new OriginDestination();
        OD.OriginDepCriteria = {
            "DateRangeStart": dateRangeStart,
            "DateRangeEnd": dateRangeEnd,
            "IATA_LocationCode": originCode
        };
        OD.DestArrivalCriteria = { "IATA_LocationCode": destinationCode };
        OD.CabinType = { CabinTypeCode: cabinTypeCode, PrefLevel: { PrefLevelCode: preflevel_1.Preflevel.REQUIRED } };
        this.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(OD);
    };
    Mixvel_AirShoppingRQ.prototype.addCarrierCriteria = function (allowedCarrierCodes) {
        var _this = this;
        this.ShoppingCriteria.push({ "CarrierCriteria": [{
                    "Carrier": []
                }] });
        allowedCarrierCodes.forEach(function (code) {
            _this.ShoppingCriteria[0].CarrierCriteria[0].Carrier.push({
                "AirlineDesigCode": code
            });
        });
    };
    return Mixvel_AirShoppingRQ;
}());
exports.Mixvel_AirShoppingRQ = Mixvel_AirShoppingRQ;
