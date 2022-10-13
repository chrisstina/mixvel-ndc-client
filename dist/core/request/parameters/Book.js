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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = exports.BookParams = exports.SUPPORTED_DOCTYPES = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("./AbstractRequestParams");
var Price_1 = require("./Price");
var TicketIssue_1 = require("./TicketIssue");
exports.SUPPORTED_DOCTYPES = ["REGULAR_PASSPORT_RU", "BIRTHDAY_CERTIFICATE", "INTERNATIONAL_PASSPORT_RU", "NATIONAL_PASSPORT", "OFFICER_ID", "TEMPORARY_ID", "MILITARY_ID", "RESIDENCE", "SEAMAN_ID", "RETURN_ID"];
var BookParams = /** @class */ (function (_super) {
    __extends(BookParams, _super);
    function BookParams(props) {
        var _this = _super.call(this) || this;
        _this.offer = new Price_1.Offer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner, props.offer.responseId);
        _this.passengers = props.passengers.map(function (passenger) { return new Passenger(passenger.ptc, passenger.personalInfo, passenger.identityDocument, passenger.contacts, passenger.loyaltyInfo, passenger.ancillaries, passenger.id); });
        if (props.formOfPayment) {
            _this.formOfPayment = new TicketIssue_1.FormOfPayment(props.formOfPayment.type, props.formOfPayment.data);
        }
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], BookParams.prototype, "passengers", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsOptional)()
    ], BookParams.prototype, "formOfPayment", void 0);
    return BookParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.BookParams = BookParams;
var PersonalInfo = /** @class */ (function () {
    function PersonalInfo(firstName, lastName, gender, dob, middleName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
    }
    __decorate([
        (0, class_validator_1.IsAlpha)()
    ], PersonalInfo.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)()
    ], PersonalInfo.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.IsOptional)()
    ], PersonalInfo.prototype, "middleName", void 0);
    __decorate([
        (0, class_validator_1.IsIn)(["M", "F"])
    ], PersonalInfo.prototype, "gender", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MaxDate)(new Date())
    ], PersonalInfo.prototype, "dob", void 0);
    return PersonalInfo;
}());
var IdentityDocument = /** @class */ (function () {
    function IdentityDocument(type, number, issuingCountry, dateOfIssue, dateOfExpiry) {
        this.type = type;
        this.number = number;
        this.issuingCountry = issuingCountry;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiry = dateOfExpiry;
    }
    __decorate([
        (0, class_validator_1.IsIn)(exports.SUPPORTED_DOCTYPES)
    ], IdentityDocument.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Document number should not be empty' })
    ], IdentityDocument.prototype, "number", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.Length)(2, 2)
    ], IdentityDocument.prototype, "issuingCountry", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MaxDate)(new Date())
    ], IdentityDocument.prototype, "dateOfIssue", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MinDate)(new Date())
    ], IdentityDocument.prototype, "dateOfExpiry", void 0);
    return IdentityDocument;
}());
var Contact = /** @class */ (function () {
    function Contact(phoneNumber, email) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)() //@todo regexp?
    ], Contact.prototype, "phoneNumber", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)()
    ], Contact.prototype, "email", void 0);
    return Contact;
}());
var Passenger = /** @class */ (function () {
    function Passenger(ptc, personalInfo, identityDocument, contacts, loyaltyInfo, ancillaries, id) {
        this.id = id;
        this.ptc = ptc;
        this.personalInfo = new PersonalInfo(personalInfo.firstName, personalInfo.lastName, personalInfo.gender, personalInfo.dob, personalInfo.middleName);
        this.identityDocument = new IdentityDocument(identityDocument.type, identityDocument.number, identityDocument.issuingCountry, identityDocument.dateOfIssue, identityDocument.dateOfExpiry);
        this.contacts = new Contact(contacts.phoneNumber, contacts.email);
        this.loyaltyInfo = loyaltyInfo;
        this.ancillaries = ancillaries;
    }
    __decorate([
        (0, class_validator_1.IsIn)(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ], Passenger.prototype, "ptc", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], Passenger.prototype, "personalInfo", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], Passenger.prototype, "identityDocument", void 0);
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], Passenger.prototype, "contacts", void 0);
    return Passenger;
}());
exports.Passenger = Passenger;
