"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMessageMapper = void 0;
var assert_1 = __importDefault(require("assert"));
var Mixvel_OrderCreateRQ_1 = require("../request/Mixvel_OrderCreateRQ");
var documentType_1 = require("./dictionary/documentType");
var ptc_1 = require("./dictionary/ptc");
var commonMappers_1 = require("./commonMappers");
var BookMessageMapper = /** @class */ (function () {
    function BookMessageMapper(params) {
        this.params = params;
    }
    // @todo validate
    BookMessageMapper.prototype.map = function () {
        var _this = this;
        var mixvelRequestMessage = new Mixvel_OrderCreateRQ_1.Mixvel_OrderCreateRQ(this.params.offerId);
        var paxRefs = new Map();
        this.params.passengers.forEach(function (passenger, idx) {
            var pax = BookMessageMapper.passengerToPax(passenger, idx + 1);
            paxRefs.set(passenger.ptc, __spreadArray(__spreadArray([], paxRefs.get(passenger.ptc) || [], true), [pax.PaxID], false));
            mixvelRequestMessage.addPax(pax, _this.passengerToContact(passenger, idx + 1));
            // @todo LoyaltyProgramAccount
        });
        this.params.offerItemIds.forEach(function (_a) {
            var id = _a.id, ptc = _a.ptc;
            if (paxRefs.has(ptc)) {
                mixvelRequestMessage.addSelectedOfferItem(id, paxRefs.get(ptc));
            }
        });
        return mixvelRequestMessage;
    };
    BookMessageMapper.passengerToPax = function (passenger, paxId) {
        (0, assert_1.default)(//@todo move to params validation
        passenger.personalInfo.middleName !== undefined && passenger.personalInfo.middleName.length > 0, "Missing middle name for pax #".concat(paxId));
        return new Mixvel_OrderCreateRQ_1.Pax((0, commonMappers_1.toAge)(passenger.personalInfo.dob), '', {
            IdentityDocID: passenger.identityDocument.number,
            IdentityDocTypeCode: (0, documentType_1.toMixvel)(passenger.identityDocument.type),
            ExpiryDate: (0, commonMappers_1.toMixvelDate)(passenger.identityDocument.dateOfExpiry),
            IssueDate: (0, commonMappers_1.toMixvelDate)(passenger.identityDocument.dateOfIssue),
            IssuingCountryCode: passenger.identityDocument.issuingCountry,
            Surname: passenger.personalInfo.lastName
        }, {
            GenderCode: passenger.personalInfo.gender,
            GivenName: passenger.personalInfo.firstName,
            MiddleName: passenger.personalInfo.middleName,
            Surname: passenger.personalInfo.lastName,
            Birthdate: (0, commonMappers_1.toMixvelDate)(passenger.personalInfo.dob)
        }, generatePaxReference(paxId), (0, ptc_1.toMixvel)(passenger.ptc));
    };
    BookMessageMapper.prototype.passengerToContact = function (passenger, paxId) {
        var email = passenger.contacts.email || this.firstAvailableEmail();
        (0, assert_1.default)(email !== undefined, "Missing email for pax #".concat(paxId)); //@todo move to params validation
        (0, assert_1.default)(passenger.contacts.phoneNumber !== undefined, "Missing phone number for pax #".concat(paxId)); //@todo move to params validation and check for infant
        return new Mixvel_OrderCreateRQ_1.ContactInfo(generateContactReference(paxId), { EmailAddressText: email, ContactTypeText: "personal" }, { PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber), ContactTypeText: "personal" });
    };
    BookMessageMapper.prototype.firstAvailableEmail = function () {
        for (var passengersKey in this.params.passengers) {
            if (this.params.passengers[passengersKey].contacts.email !== undefined) {
                return this.params.passengers[passengersKey].contacts.email;
            }
        }
    };
    return BookMessageMapper;
}());
exports.BookMessageMapper = BookMessageMapper;
function generatePaxReference(paxId) {
    return "Pax_".concat(paxId);
}
function generateContactReference(paxId) {
    return "Pax_".concat(paxId);
}
/**
 * Phone has to contain '+' sign
 * @param phone
 */
function prepPhoneNumber(phone) {
    return [phone.indexOf('+') !== -1 ? '' : '+', phone].join('');
}
