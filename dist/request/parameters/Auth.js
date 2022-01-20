"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthParams = void 0;
var class_validator_1 = require("class-validator");
var Result_1 = require("../../core/Result");
var RequestValidationService_1 = require("../../services/RequestValidationService");
var validationService = new RequestValidationService_1.RequestValidationService();
var AuthParams = /** @class */ (function () {
    function AuthParams(login, password, structureId) {
        this.login = login;
        this.password = password;
        this.structureId = structureId;
    }
    AuthParams.create = function (props) {
        var params = new AuthParams(props.login, props.password, props.structureId);
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            return Result_1.Result.fail(validationService.collectValidationErrors(validationErrors).join('\r\n')); // @todo
        }
        return Result_1.Result.ok(params);
    };
    __decorate([
        (0, class_validator_1.IsAlphanumeric)()
    ], AuthParams.prototype, "login", void 0);
    __decorate([
        (0, class_validator_1.IsAlphanumeric)()
    ], AuthParams.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsAlphanumeric)()
    ], AuthParams.prototype, "structureId", void 0);
    return AuthParams;
}());
exports.AuthParams = AuthParams;
