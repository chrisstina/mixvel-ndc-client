"use strict";
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
exports.AirShoppingRQ = exports.Pax = exports.OriginDestination = void 0;
var AbstractTicketMeNDCMessage_1 = require("./AbstractTicketMeNDCMessage");
var ptc_1 = require("../mappers/dictionary/ptc");
var cabin_1 = require("../mappers/dictionary/cabin");
var OriginDestination = /** @class */ (function () {
    function OriginDestination() {
        // @todo <SegMaxTimePreferences>
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
exports.Pax = Pax;
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
                OriginDestinations: [{ OriginDestination: [] }],
            },
        ];
        _this.Preference = [
            {
                CabinPreferences: [{ CabinType: [{ Code: [{ _: cabin_1.TicketMeCabin.ANY }] }] }],
            },
        ];
        _this.DataLists = [
            {
                PassengerList: [
                    {
                        Passenger: [],
                    },
                ],
            },
        ];
        return _this;
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
    return AirShoppingRQ;
}(AbstractTicketMeNDCMessage_1.AbstractTicketMeNDCMessage));
exports.AirShoppingRQ = AirShoppingRQ;
