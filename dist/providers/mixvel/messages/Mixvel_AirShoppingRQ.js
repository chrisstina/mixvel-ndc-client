"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_AirShoppingRQ = exports.Pax = exports.OriginDestination = void 0;
var ptc_1 = require("../mappers/dictionary/ptc");
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
        if (ptc === void 0) { ptc = ptc_1.MixvelPTC.ADULT; }
        // mind the property order!
        if (age) {
            this.AgeMeasure = age;
        }
        this.PaxID = id;
        this.PTC = ptc;
    }
    return Pax;
}());
exports.Pax = Pax;
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
var Mixvel_AirShoppingRQ = /** @class */ (function () {
    function Mixvel_AirShoppingRQ() {
        this.FlightRequest = {
            "FlightRequestOriginDestinationsCriteria": {
                "OriginDestCriteria": []
            }
        };
        this.Paxs = {
            "Pax": []
        };
        this.ShoppingCriteria = [];
    }
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
    return Mixvel_AirShoppingRQ;
}());
exports.Mixvel_AirShoppingRQ = Mixvel_AirShoppingRQ;
