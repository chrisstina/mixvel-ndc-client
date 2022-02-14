"use strict";
/*
 * Copyright (c) 2021
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirShoppingRQ = exports.OriginDestination = void 0;
var GenericTicketMeNDCMessage_1 = require("./GenericTicketMeNDCMessage");
var ptc_1 = require("../mappers/dictionary/ptc");
var cabin_1 = require("../mappers/dictionary/cabin");
var OriginDestination = /** @class */ (function () {
    function OriginDestination() {
        this.Arrival = [];
        this.Departure = [];
    }
    return OriginDestination;
}());
exports.OriginDestination = OriginDestination;
var Pax = /** @class */ (function () {
    function Pax(id, ptc) {
        if (ptc === void 0) { ptc = ptc_1.TicketMePTC.ADULT; }
        this.PTC = [];
        this.$ = { PassengerID: id };
        this.PTC.push({ _: ptc });
    }
    return Pax;
}());
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
var AirShoppingRQ = /** @class */ (function (_super) {
    __extends(AirShoppingRQ, _super);
    function AirShoppingRQ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CoreQuery = [
            {
                OriginDestinations: [
                    { OriginDestination: [] }
                ]
            }
        ];
        _this.Preference = [{ CabinPreferences: [{ CabinType: [{ Code: [{ _: cabin_1.TicketMeCabin.ANY }] }] }] }];
        _this.DataLists = [
            {
                PassengerList: [
                    {
                        Passenger: []
                    }
                ]
            }
        ];
        return _this;
        //
        // setCurrencyPreference(currencyCode) {
        //
        // }
    }
    Object.defineProperty(AirShoppingRQ.prototype, "nodeName", {
        get: function () {
            return "AirShoppingRQ";
        },
        enumerable: false,
        configurable: true
    });
    // public "Metadata" = [
    //     {
    //         "Other": [
    //             {
    //                 "OtherMetadata": [
    //                     {
    //                         "LanguageMetadatas": [
    //                             {
    //                                 "LanguageMetadata": [
    //                                     {
    //                                         "$": {
    //                                             "MetadataKey": "LG1"
    //                                         },
    //                                         "Code_ISO": [
    //                                             {
    //                                                 "_": "ru"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
    // public Parameters = [
    //     {
    //         "CurrCodes": [
    //             {
    //                 "FiledInCurrency": [
    //                     {
    //                         "CurrCode": [
    //                             {
    //                                 "_": "EUR"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ] // @todo
    AirShoppingRQ.prototype.addPax = function (id, ptc) {
        this.DataLists[0].PassengerList[0].Passenger.push(new Pax(id, ptc));
    };
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    AirShoppingRQ.prototype.addOriginDestination = function (originCode, destinationCode, date) {
        var OD = new OriginDestination();
        OD.Arrival.push({ AirportCode: [{ _: destinationCode }] });
        OD.Departure.push({ AirportCode: [{ _: originCode }], Date: [{ _: date }] });
        this.CoreQuery[0].OriginDestinations[0].OriginDestination.push(OD);
    };
    AirShoppingRQ.prototype.setCabinPreference = function (cabin) {
        this.Preference[0].CabinPreferences[0].CabinType[0].Code[0]._ = cabin;
    };
    AirShoppingRQ.prototype.setDirectPreference = function (preference) {
        this.Preference[0]['FlightPreferences'] = [{ Characteristic: [{ DirectPreferences: [{ _: preference }] }] }];
    };
    AirShoppingRQ.prototype.addCarrierFilters = function (carriers, level) {
        var airlines = carriers.map(function (carrier) {
            return {
                $: { PreferencesLevel: level },
                AirlineID: [{ _: carrier }]
            };
        });
        if (!this.Preference[0].AirlinePreferences) {
            this.Preference[0]['AirlinePreferences'] = [];
        }
        this.Preference[0].AirlinePreferences.push({ Airline: airlines });
    };
    return AirShoppingRQ;
}(GenericTicketMeNDCMessage_1.GenericTicketMeNDCMessage));
exports.AirShoppingRQ = AirShoppingRQ;
