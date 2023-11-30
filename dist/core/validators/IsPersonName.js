"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPersonName = void 0;
var class_validator_1 = require("class-validator");
var latinNameRegExp = /[^a-zA-Z-\s]/;
var cyrillicNameRegExp = /[^a-zA-Zа-яА-Я-\s]/;
var IsPersonName = /** @class */ (function () {
    function IsPersonName() {
    }
    IsPersonName.prototype.defaultMessage = function (validationArguments) {
        return "Text ($value) is not a valid person name!";
    };
    IsPersonName.prototype.validate = function (value, validationArguments) {
        if (!value) {
            return true;
        }
        if ((validationArguments === null || validationArguments === void 0 ? void 0 : validationArguments.constraints[0]) === true) {
            return !cyrillicNameRegExp.test(value);
        }
        return !latinNameRegExp.test(value);
    };
    IsPersonName = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ async: false })
    ], IsPersonName);
    return IsPersonName;
}());
exports.IsPersonName = IsPersonName;
