"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthParams = void 0;
/**
 * @typedef AuthParams
 * @property {string} login
 * @property {string} password
 * @property {string} structureId
 */
var AuthParams = /** @class */ (function () {
    function AuthParams(login, password, structureId) {
        this.login = login;
        this.password = password;
        this.structureId = structureId;
    }
    return AuthParams;
}());
exports.AuthParams = AuthParams;
