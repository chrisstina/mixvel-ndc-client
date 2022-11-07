"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_OrderCreateRQ = exports.PaxSegmentRemark = exports.ContactInfo = exports.Pax = void 0;
var Pax = /** @class */ (function () {
    function Pax(AgeMeasure, ContactInfoRefID, IdentityDoc, Individual, PaxID, PTC, Remark, SubsidyInformation) {
        this.AgeMeasure = AgeMeasure;
        this.ContactInfoRefID = ContactInfoRefID;
        this.IdentityDoc = IdentityDoc;
        this.Individual = Individual;
        this.PaxID = PaxID;
        this.PTC = PTC;
        this.Remark = Remark;
        this.SubsidyInformation = SubsidyInformation;
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
var PaxSegmentRemark = /** @class */ (function () {
    function PaxSegmentRemark(PaxSegmentRefID, PaxRefID, Type, Text, ActionType) {
        this.PaxSegmentRefID = PaxSegmentRefID;
        this.PaxRefID = PaxRefID;
        this.Type = Type;
        this.Text = Text;
        this.ActionType = ActionType;
    }
    return PaxSegmentRemark;
}());
exports.PaxSegmentRemark = PaxSegmentRemark;
var Mixvel_OrderCreateRQ = /** @class */ (function () {
    function Mixvel_OrderCreateRQ() {
        this.CreateOrder = {
            SelectedOffer: [],
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
