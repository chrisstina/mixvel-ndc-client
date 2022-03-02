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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMessageMapper = void 0;
var Mixvel_OrderCreateRQ_1 = require("../messages/Mixvel_OrderCreateRQ");
var documentType_1 = require("./dictionary/documentType");
var ptc_1 = require("./dictionary/ptc");
var commonMappers_1 = require("./commonMappers");
var BookMessageMapper = /** @class */ (function () {
    function BookMessageMapper(params) {
        this.params = params;
    }
    BookMessageMapper.passengerToPax = function (passenger, paxId) {
        return new Mixvel_OrderCreateRQ_1.Pax((0, commonMappers_1.toAge)(passenger.personalInfo.dob), '', {
            ExpiryDate: (0, commonMappers_1.toMixvelDate)(passenger.identityDocument.dateOfExpiry),
            IdentityDocID: passenger.identityDocument.number,
            IdentityDocTypeCode: (0, documentType_1.toMixvel)(passenger.identityDocument.type),
            IssueDate: (0, commonMappers_1.toMixvelDate)(passenger.identityDocument.dateOfIssue),
            IssuingCountryCode: passenger.identityDocument.issuingCountry,
            Surname: passenger.personalInfo.lastName
        }, {
            Birthdate: (0, commonMappers_1.toMixvelDate)(passenger.personalInfo.dob),
            GenderCode: passenger.personalInfo.gender,
            GivenName: passenger.personalInfo.firstName,
            MiddleName: passenger.personalInfo.middleName || "",
            Surname: passenger.personalInfo.lastName,
        }, generatePaxReference(paxId), (0, ptc_1.toMixvel)(passenger.ptc));
    };
    BookMessageMapper.passengerToContact = function (passenger, paxId) {
        return new Mixvel_OrderCreateRQ_1.ContactInfo(generateContactReference(paxId), { ContactTypeText: "personal", EmailAddressText: passenger.contacts.email }, { ContactTypeText: "personal", PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || '') });
    };
    BookMessageMapper.prototype.map = function () {
        var mixvelRequestMessage = new Mixvel_OrderCreateRQ_1.Mixvel_OrderCreateRQ(this.params.offer.offerId);
        var paxRefs = new Map();
        this.params.passengers.forEach(function (passenger, idx) {
            var pax = BookMessageMapper.passengerToPax(passenger, idx + 1);
            paxRefs.set(passenger.ptc, __spreadArray(__spreadArray([], paxRefs.get(passenger.ptc) || [], true), [pax.PaxID], false));
            mixvelRequestMessage.addPax(pax, BookMessageMapper.passengerToContact(passenger, idx + 1));
            // @todo LoyaltyProgramAccount
        });
        this.params.offer.offerItems.forEach(function (_a) {
            var offerItemId = _a.offerItemId, ptc = _a.ptc;
            if (paxRefs.has(ptc)) {
                mixvelRequestMessage.addSelectedOfferItem(offerItemId, paxRefs.get(ptc));
            }
        });
        return mixvelRequestMessage;
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
