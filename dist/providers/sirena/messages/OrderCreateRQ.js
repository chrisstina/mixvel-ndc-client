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
exports.OrderCreateRQ = exports.Pax = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var Pax = /** @class */ (function () {
    function Pax(id, ptc, issuingCountry, individual, document, contactRef) {
        this.PTC = [];
        this.InfantRef = [];
        this.$ = { PassengerID: id };
        this.PTC.push({ _: ptc });
        this.CitizenshipCountryCode = [{ _: issuingCountry }];
        this.Individual = [individual];
        this.IdentityDocument = [document];
        this.ContactInfoRef = [{ _: contactRef }];
    }
    Pax.prototype.attachInfant = function (infantRef) {
        if (infantRef) {
            this.InfantRef = [{ _: infantRef }];
        }
    };
    return Pax;
}());
exports.Pax = Pax;
var OrderCreateRQ = /** @class */ (function (_super) {
    __extends(OrderCreateRQ, _super);
    function OrderCreateRQ(offer) {
        var _this = _super.call(this) || this;
        _this.Query = [
            {
                Order: [{ Offer: [offer] }],
                DataLists: [
                    {
                        PassengerList: [
                            {
                                Passenger: [],
                            },
                        ],
                        ContactList: [
                            {
                                ContactInformation: [],
                            },
                        ],
                    },
                ],
            },
        ];
        return _this;
    }
    Object.defineProperty(OrderCreateRQ.prototype, "nodeName", {
        get: function () {
            return "OrderCreateRQ";
        },
        enumerable: false,
        configurable: true
    });
    return OrderCreateRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.OrderCreateRQ = OrderCreateRQ;
