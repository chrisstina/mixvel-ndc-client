"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMessageMapper = void 0;
var OrderCreateRQ_1 = require("../messages/OrderCreateRQ");
var ptc_1 = require("./dictionary/ptc");
var documentType_1 = require("./dictionary/documentType");
var commonMappers_1 = require("../../ticketme/mappers/commonMappers");
var ptc_2 = require("../../../core/helpers/ptc");
var BookMessageMapper = /** @class */ (function () {
    function BookMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OrderCreateRQ_1.OrderCreateRQ({
            $: {
                Owner: this.params.offer.offerOwner || "",
                OfferID: this.params.offer.offerId,
                ResponseID: this.params.offer.responseId || "",
            },
            OfferItem: this.params.offer.offerItems.map(function (item) {
                return {
                    $: { OfferItemID: item.offerItemId },
                    PassengerRefs: { _: item.paxs || "" },
                };
            }),
        });
        this.message.addParty(__assign(__assign({}, this.credentials), { contacts: this.params.agencyContacts }));
    }
    BookMessageMapper.prototype.map = function () {
        var _this = this;
        this.params.passengers.forEach(function (passenger) {
            var paxContact = _this.passengerToContact(passenger);
            _this.addPax(_this.passengerToPax(passenger, paxContact), paxContact);
        });
        if (ptc_2.PtcHelper.hasInfants(this.params)) {
            this.createInfantRefs();
        }
        return this.message;
    };
    BookMessageMapper.prototype.addPax = function (pax, paxContact) {
        this.message.Query[0].DataLists[0].PassengerList[0].Passenger.push(pax);
        this.message.Query[0].DataLists[0].ContactList[0].ContactInformation.push(paxContact);
    };
    BookMessageMapper.prototype.passengerToPax = function (passenger, paxContact) {
        var document = {
            IdentityDocumentNumber: [{ _: passenger.identityDocument.number }],
            IdentityDocumentType: [
                { _: (0, documentType_1.toSirena)(passenger.identityDocument.type) },
            ],
            ExpiryDate: [
                { _: (0, commonMappers_1.toTicketMeDate)(passenger.identityDocument.dateOfExpiry) },
            ],
            Birthdate: [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.personalInfo.dob) }],
            NameTitle: [{ _: (0, commonMappers_1.genderToTitle)(passenger.personalInfo.gender) }],
            GivenName: [{ _: passenger.personalInfo.firstName }],
            Surname: [{ _: passenger.personalInfo.lastName }],
        };
        var individual = {
            GivenName: [{ _: passenger.personalInfo.firstName }],
            Surname: [{ _: passenger.personalInfo.lastName }],
            Birthdate: [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.personalInfo.dob) }],
            Gender: [{ _: (0, commonMappers_1.toTicketMeGender)(passenger.personalInfo.gender) }],
        };
        if (passenger.personalInfo.middleName) {
            individual["MiddleName"] = [
                { _: passenger.personalInfo.middleName || "" },
            ];
        }
        var pax = new OrderCreateRQ_1.Pax(passenger.id || "", (0, ptc_1.toSirena)(passenger.ptc), passenger.identityDocument.issuingCountry, individual, document, paxContact.$.ContactID);
        if (passenger.loyaltyInfo && passenger.loyaltyInfo.code) {
            pax.LoyaltyProgramAccount = [
                {
                    Airline: {
                        AirlineDesignator: [{ _: passenger.loyaltyInfo.carrier || "" }],
                    },
                    AccountNumber: [{ _: passenger.loyaltyInfo.code }],
                },
            ];
        }
        return pax;
    };
    BookMessageMapper.prototype.createInfantRefs = function () {
        var infantRefs = this.message.Query[0].DataLists[0].PassengerList[0].Passenger.filter(function (passenger) { return passenger.PTC[0]._ === ptc_1.SirenaPTC.INFANT; }).map(function (passenger) { return passenger.$.PassengerID; });
        this.message.Query[0].DataLists[0].PassengerList[0].Passenger.forEach(function (passenger) {
            if (infantRefs.length > 0 && passenger.PTC[0]._ === ptc_1.SirenaPTC.ADULT) {
                passenger.attachInfant(infantRefs.pop());
            }
        });
    };
    BookMessageMapper.prototype.passengerToContact = function (passenger) {
        var contact = {
            $: { ContactID: generateContactReference(passenger.id || "") },
            ContactProvided: [],
        };
        if (passenger.contacts.phoneNumber) {
            contact.ContactProvided.push({
                Phone: [{ PhoneNumber: [{ _: passenger.contacts.phoneNumber }] }],
            });
        }
        if (passenger.contacts.email) {
            contact.ContactProvided.push({
                EmailAddress: [
                    { EmailAddressValue: [{ _: passenger.contacts.email }] },
                ],
            });
        }
        return contact;
    };
    return BookMessageMapper;
}());
exports.BookMessageMapper = BookMessageMapper;
function generateContactReference(paxId) {
    return "CTC_".concat(paxId);
}
