"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderCreateRQ = exports.ContactInfo = exports.Pax = void 0;
var Pax = /** @class */ (function () {
    function Pax(AgeMeasure, ContactInfoRefID, IdentityDoc, Individual, PaxID, PTC) {
        this.AgeMeasure = AgeMeasure;
        this.ContactInfoRefID = ContactInfoRefID;
        this.IdentityDoc = IdentityDoc;
        this.Individual = Individual;
        this.PaxID = PaxID;
        this.PTC = PTC;
    }
    return Pax;
}());
exports.Pax = Pax;
var ContactInfo = /** @class */ (function () {
    function ContactInfo(ContactInfoID, EmailAddress, Phone) {
        this.ContactInfoID = ContactInfoID;
        this.EmailAddress = EmailAddress;
        this.Phone = Phone;
    }
    return ContactInfo;
}());
exports.ContactInfo = ContactInfo;
var Mixvel_OrderCreateRQ = /** @class */ (function () {
    function Mixvel_OrderCreateRQ(offerId) {
        this.CreateOrder = {
            SelectedOffer: {
                OfferRefID: offerId,
            },
        };
        this.DataLists = { ContactInfoList: { ContactInfo: [] }, PaxList: { Pax: [] } };
    }
    Object.defineProperty(Mixvel_OrderCreateRQ.prototype, "xmlns", {
        get: function () {
            return { "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderCreateRQ/1_01" };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_OrderCreateRQ.prototype, "nodeName", {
        get: function () {
            return "m:Mixvel_OrderCreateRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_OrderCreateRQ;
}());
exports.Mixvel_OrderCreateRQ = Mixvel_OrderCreateRQ;
