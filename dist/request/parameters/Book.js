"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = exports.BookParams = void 0;
var class_validator_1 = require("class-validator");
var Result_1 = require("../../core/Result");
var RequestValidationService_1 = require("../../services/RequestValidationService");
var validationService = new RequestValidationService_1.RequestValidationService();
var BookParams = /** @class */ (function () {
    function BookParams(props) {
        this.offerId = props.offerId;
        this.offerItemIds = props.offerItemIds;
        this.passengers = props.passengers.map(function (passenger) { return new Passenger(passenger.ptc, passenger.personalInfo, passenger.identityDocument, passenger.contacts, passenger.loyaltyInfo); });
    }
    BookParams.create = function (props) {
        var params = new BookParams(props);
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            return Result_1.Result.fail(validationService.collectValidationErrors(validationErrors).join(', '));
        }
        return Result_1.Result.ok(params);
    };
    __decorate([
        (0, class_validator_1.IsString)()
    ], BookParams.prototype, "offerId", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], BookParams.prototype, "offerItemIds", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], BookParams.prototype, "passengers", void 0);
    return BookParams;
}());
exports.BookParams = BookParams;
var OfferItem = /** @class */ (function () {
    function OfferItem(id, ptc) {
        this.id = id;
        this.ptc = ptc;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], OfferItem.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsIn)(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ], OfferItem.prototype, "ptc", void 0);
    return OfferItem;
}());
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
        (0, class_validator_1.IsIn)(["PASSPORT", "BIRTHDAY_CERTIFICATE", "INTERNATIONAL"])
    ], IdentityDocument.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsAlphanumeric)()
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
    function Passenger(ptc, personalInfo, identityDocument, contacts, loyaltyInfo) {
        this.ptc = ptc;
        this.personalInfo = new PersonalInfo(personalInfo.firstName, personalInfo.lastName, personalInfo.gender, personalInfo.dob, personalInfo.middleName);
        this.identityDocument = new IdentityDocument(identityDocument.type, identityDocument.number, identityDocument.issuingCountry, identityDocument.dateOfIssue, identityDocument.dateOfExpiry);
        this.contacts = new Contact(contacts.phoneNumber, contacts.email);
        this.loyaltyInfo = loyaltyInfo;
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
    return Passenger;
}());
exports.Passenger = Passenger;
