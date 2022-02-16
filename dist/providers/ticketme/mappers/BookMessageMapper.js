"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMessageMapper = void 0;
var OrderCreateRQ_1 = require("../messages/OrderCreateRQ");
var ptc_1 = require("./dictionary/ptc");
var documentType_1 = require("./dictionary/documentType");
var commonMappers_1 = require("./commonMappers");
var BookMessageMapper = /** @class */ (function () {
    function BookMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    BookMessageMapper.passengerToPax = function (passenger, paxContact) {
        var document = {
            IdentityDocumentNumber: [{ _: passenger.identityDocument.number }],
            IdentityDocumentType: [{ _: (0, documentType_1.toTicketMe)(passenger.identityDocument.type) }],
            ExpiryDate: [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.identityDocument.dateOfExpiry) }],
            Birthdate: [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.personalInfo.dob) }],
            NameTitle: [{ _: (0, commonMappers_1.genderToTitle)(passenger.personalInfo.gender) }],
            GivenName: [{ _: passenger.personalInfo.firstName }],
            Surname: [{ _: passenger.personalInfo.lastName }],
        };
        var pax = {
            $: { PassengerID: passenger.id || '' },
            PTC: [{ _: (0, ptc_1.toTicketMe)(passenger.ptc) }],
            CitizenshipCountryCode: [{ _: passenger.identityDocument.issuingCountry }],
            Individual: [{
                    "GivenName": [{ _: passenger.personalInfo.firstName }],
                    "Surname": [{ _: passenger.personalInfo.lastName }],
                    "MiddleName": [{ _: passenger.personalInfo.middleName || '' }],
                    "Birthdate": [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.personalInfo.dob) }],
                    "Gender": [{ _: (0, commonMappers_1.toTicketMeGender)(passenger.personalInfo.gender) }],
                }],
            IdentityDocument: [document],
            ContactInfoRef: [{ _: paxContact.$.ContactID }]
        };
        return pax;
    };
    BookMessageMapper.passengerToContact = function (passenger) {
        var contact = {
            $: { "ContactID": generateContactReference(passenger.id || '') },
            ContactProvided: []
        };
        if (passenger.contacts.phoneNumber) {
            contact.ContactProvided.push({ "Phone": [{ "PhoneNumber": [{ _: passenger.contacts.phoneNumber }] }] });
        }
        if (passenger.contacts.email) {
            contact.ContactProvided.push({ "EmailAddress": [{ "EmailAddressValue": [{ _: passenger.contacts.email }] }] });
        }
        return contact;
    };
    BookMessageMapper.prototype.map = function () {
        var ticketmeRequestMessage = new OrderCreateRQ_1.OrderCreateRQ({
            $: {
                Owner: this.params.offer.offerOwner || '',
                OfferID: this.params.offer.offerId,
                ResponseID: this.params.offer.responseId || ''
            },
            OfferItem: this.params.offer.offerItems.map(function (item) {
                return {
                    $: { OfferItemID: item.offerItemId },
                    PassengerRefs: { _: item.paxs || '' }
                };
            })
        });
        this.params.passengers.forEach(function (passenger) {
            var paxContact = BookMessageMapper.passengerToContact(passenger);
            ticketmeRequestMessage.addPax(BookMessageMapper.passengerToPax(passenger, paxContact), BookMessageMapper.passengerToContact(passenger));
        });
        ticketmeRequestMessage.addParty(this.credentials);
        return ticketmeRequestMessage;
    };
    return BookMessageMapper;
}());
exports.BookMessageMapper = BookMessageMapper;
function generateContactReference(paxId) {
    return "CTC_".concat(paxId);
}
