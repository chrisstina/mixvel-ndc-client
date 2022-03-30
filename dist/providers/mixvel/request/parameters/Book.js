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
exports.MixvelBookParams = exports.MixvelPassenger = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("../../../../core/request/parameters/AbstractRequestParams");
var Book_1 = require("../../../../core/request/parameters/Book");
var Price_1 = require("../../../../core/request/parameters/Price");
var BookParamsValidator_1 = require("../../validators/BookParamsValidator");
var MixvelContact = /** @class */ (function () {
    function MixvelContact(phoneNumber, email) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)() //@todo regexp?
    ], MixvelContact.prototype, "phoneNumber", void 0);
    __decorate([
        (0, class_validator_1.IsEmail)({}, { message: 'Mixvel requires at least one valid email' })
    ], MixvelContact.prototype, "email", void 0);
    return MixvelContact;
}());
var MixvelIdentityDocument = /** @class */ (function () {
    function MixvelIdentityDocument(type, number, issuingCountry, dateOfIssue, dateOfExpiry) {
        this.type = type;
        this.number = number;
        this.issuingCountry = issuingCountry;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiry = dateOfExpiry;
    }
    __decorate([
        (0, class_validator_1.IsIn)(BookParamsValidator_1.SUPPORTED_DOCTYPES, { message: "Mixvel supports only following document types: ".concat(BookParamsValidator_1.SUPPORTED_DOCTYPES) })
    ], MixvelIdentityDocument.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Document number should not be empty' })
    ], MixvelIdentityDocument.prototype, "number", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.Length)(2, 2)
    ], MixvelIdentityDocument.prototype, "issuingCountry", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MaxDate)(new Date())
    ], MixvelIdentityDocument.prototype, "dateOfIssue", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MinDate)(new Date())
    ], MixvelIdentityDocument.prototype, "dateOfExpiry", void 0);
    return MixvelIdentityDocument;
}());
var MixvelPersonalInfo = /** @class */ (function () {
    function MixvelPersonalInfo(firstName, lastName, gender, dob, middleName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
    }
    __decorate([
        (0, class_validator_1.IsAlpha)()
    ], MixvelPersonalInfo.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)()
    ], MixvelPersonalInfo.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)()
    ], MixvelPersonalInfo.prototype, "middleName", void 0);
    __decorate([
        (0, class_validator_1.IsIn)(["M", "F"])
    ], MixvelPersonalInfo.prototype, "gender", void 0);
    __decorate([
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MaxDate)(new Date())
    ], MixvelPersonalInfo.prototype, "dob", void 0);
    return MixvelPersonalInfo;
}());
var MixvelPassenger = /** @class */ (function (_super) {
    __extends(MixvelPassenger, _super);
    function MixvelPassenger(ptc, personalInfo, identityDocument, contacts, loyaltyInfo, id) {
        var _this = _super.call(this, ptc, personalInfo, identityDocument, contacts, loyaltyInfo, id) || this;
        _this.personalInfo = new MixvelPersonalInfo(personalInfo.firstName, personalInfo.lastName, personalInfo.gender, personalInfo.dob, personalInfo.middleName || '');
        _this.identityDocument = new MixvelIdentityDocument(identityDocument.type, identityDocument.number, identityDocument.issuingCountry, identityDocument.dateOfIssue, identityDocument.dateOfExpiry);
        _this.contacts = new MixvelContact(contacts.phoneNumber || '', contacts.email || '');
        return _this;
    }
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], MixvelPassenger.prototype, "contacts", void 0);
    return MixvelPassenger;
}(Book_1.Passenger));
exports.MixvelPassenger = MixvelPassenger;
var MixvelBookParams = /** @class */ (function (_super) {
    __extends(MixvelBookParams, _super);
    function MixvelBookParams(props) {
        var _this = _super.call(this) || this;
        _this.offer = new Price_1.Offer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner, props.offer.responseId);
        _this.passengers = props.passengers.map(function (passenger) { return new MixvelPassenger(passenger.ptc, passenger.personalInfo, passenger.identityDocument, passenger.contacts, passenger.loyaltyInfo, passenger.id); });
        return _this;
    }
    __decorate([
        (0, class_validator_1.ValidateNested)({ each: true })
    ], MixvelBookParams.prototype, "offer", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], MixvelBookParams.prototype, "passengers", void 0);
    return MixvelBookParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.MixvelBookParams = MixvelBookParams;
