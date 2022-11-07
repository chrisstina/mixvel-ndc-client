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
var DEFAULT_FOP = 'CASH';
var BookMessageMapper = /** @class */ (function () {
    function BookMessageMapper(params) {
        this.params = params;
        this.message = new Mixvel_OrderCreateRQ_1.Mixvel_OrderCreateRQ();
    }
    BookMessageMapper.prototype.map = function () {
        var _this = this;
        var paxRefs = new Map(), ancillaryOffers = [], paxRemarks = new Map();
        this.params.passengers.forEach(function (passenger, idx) {
            var pax = _this.passengerToPax(passenger, idx + 1);
            paxRefs.set(passenger.ptc, __spreadArray(__spreadArray([], paxRefs.get(passenger.ptc) || [], true), [pax.PaxID], false));
            if (passenger.ssrRemarks) {
                paxRemarks.set(pax.PaxID, passenger.ssrRemarks);
            }
            _this.addPax(pax, _this.passengerToContact(passenger, idx + 1));
            // @todo LoyaltyProgramAccount
            if (passenger.ancillaries && passenger.ancillaries.length > 0) { // collect ancillaries
                ancillaryOffers.push.apply(// collect ancillaries
                ancillaryOffers, passenger.ancillaries.map(function (ancillary) {
                    return { ancillary: ancillary, paxRef: pax.PaxID };
                }));
            }
        });
        if (paxRemarks.size > 0) {
            this.addPaxRemarks(paxRemarks);
        }
        var flightOffer = this.addSelectedOffer(this.params.offer);
        this.params.offer.offerItems.forEach(function (_a) {
            var offerItemId = _a.offerItemId, ptc = _a.ptc;
            if (paxRefs.has(ptc)) {
                _this.addSelectedOfferItem(flightOffer, offerItemId, paxRefs.get(ptc));
            }
        });
        // ancillaries
        ancillaryOffers.forEach(function (_a) {
            var ancillary = _a.ancillary, paxRef = _a.paxRef;
            var ancillaryOffer = _this.addSelectedOffer(ancillary);
            ancillary.offerItems.forEach(function (_a) {
                var offerItemId = _a.offerItemId, ptc = _a.ptc;
                _this.addSelectedOfferItem(ancillaryOffer, offerItemId, [paxRef]);
            });
        });
        // form of payment
        this.setPaymentDetails((0, commonMappers_1.toFOP)(this.params.formOfPayment || { type: DEFAULT_FOP }));
        return this.message;
    };
    BookMessageMapper.prototype.passengerToPax = function (passenger, paxId) {
        var pax = new Mixvel_OrderCreateRQ_1.Pax((0, commonMappers_1.toAge)(passenger.personalInfo.dob), '', {
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
            MiddleName: passenger.personalInfo.middleName || undefined,
            Surname: passenger.personalInfo.lastName,
        }, generatePaxReference(paxId), (0, ptc_1.toMixvel)(passenger.ptc));
        if (!pax.Individual.MiddleName) { // mind the nodes order
            delete pax.Individual.MiddleName;
        }
        if (passenger.osiRemarks && passenger.osiRemarks.length > 0) {
            pax.Remark = [];
            passenger.osiRemarks.forEach(function (remarkText) {
                var _a;
                (_a = pax.Remark) === null || _a === void 0 ? void 0 : _a.push({ RemarkText: remarkText });
            });
        }
        else {
            delete pax.Remark;
        }
        if (passenger.subsidyData) {
            pax.SubsidyInformation = {
                SubsidyProgram: passenger.subsidyData.program,
                SubsidyType: passenger.subsidyData.type,
            };
        }
        else {
            delete pax.SubsidyInformation;
        }
        return pax;
    };
    BookMessageMapper.prototype.passengerToContact = function (passenger, paxId) {
        return new Mixvel_OrderCreateRQ_1.ContactInfo(generateContactReference(paxId), { ContactTypeText: "personal", EmailAddressText: passenger.contacts.email }, { ContactTypeText: "personal", PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || '') });
    };
    BookMessageMapper.prototype.addPax = function (pax, paxContact) {
        pax.ContactInfoRefID = paxContact.ContactInfoID;
        this.message.DataLists.PaxList.Pax.push(pax);
        this.message.DataLists.ContactInfoList.ContactInfo.push(paxContact);
    };
    /**
     * @param {Offer} offer
     * @return {SelectedOffer}
     */
    BookMessageMapper.prototype.addSelectedOffer = function (offer) {
        this.message.CreateOrder.SelectedOffer.push({ OfferRefID: offer.offerId, SelectedOfferItem: [] });
        return this.message.CreateOrder.SelectedOffer[this.message.CreateOrder.SelectedOffer.length - 1];
    };
    /**
     * @param {SelectedOffer} selectedOffer
     * @param {string} offerItemId
     * @param {string[]} paxRefs
     */
    BookMessageMapper.prototype.addSelectedOfferItem = function (selectedOffer, offerItemId, paxRefs) {
        if (!selectedOffer.SelectedOfferItem) {
            selectedOffer.SelectedOfferItem = [];
        }
        selectedOffer.SelectedOfferItem.push({
            OfferItemRefID: offerItemId,
            PaxRefID: paxRefs
        });
    };
    BookMessageMapper.prototype.addPaxRemarks = function (paxRemarks) {
        var _this = this;
        this.message.DataLists.PaxSegmentRemarkList = { PaxSegmentRemark: [] };
        paxRemarks.forEach(function (ssrRemarks, paxRef) {
            ssrRemarks.forEach(function (remark) {
                var _a;
                var paxremark = {
                    PaxRefID: paxRef,
                    Type: remark.type,
                    Text: remark.text
                };
                (_a = _this.message.DataLists.PaxSegmentRemarkList) === null || _a === void 0 ? void 0 : _a.PaxSegmentRemark.push(paxremark);
            });
        });
    };
    BookMessageMapper.prototype.setPaymentDetails = function (fop) {
        this.message.PaymentFunctions = {
            "PaymentProcessingDetails": {
                "PaymentProcessingDetailsPaymentMethod": fop
            }
        };
    };
    return BookMessageMapper;
}());
exports.BookMessageMapper = BookMessageMapper;
function generatePaxReference(paxId) {
    return "Pax_".concat(paxId);
}
function generateContactReference(paxId) {
    return "PaxContact_".concat(paxId);
}
/**
 * Phone has to contain '+' sign
 * @param phone
 */
function prepPhoneNumber(phone) {
    return [phone.indexOf('+') !== -1 ? '' : '+', phone].join('');
}
