"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFOP = exports.toAge = exports.toMixvelDate = void 0;
var assert_1 = __importDefault(require("assert"));
var luxon_1 = require("luxon");
var Mixvel_CommonTypes_1 = require("../messages/Mixvel_CommonTypes");
function toMixvelDate(date) {
    return luxon_1.DateTime.fromJSDate(date).toISODate();
}
exports.toMixvelDate = toMixvelDate;
function toAge(date) {
    return Math.abs(luxon_1.DateTime.fromJSDate(date).diffNow("years").years).toFixed(0);
}
exports.toAge = toAge;
function toFOP(_a) {
    var type = _a.type, data = _a.data;
    switch (type) {
        case "BILL":
            (0, assert_1.default)(typeof data === "string", "Data for BILL FOP must be string"); // @todo move to validation
            return new Mixvel_CommonTypes_1.DirectBill(data);
        case "CASH":
            return new Mixvel_CommonTypes_1.OtherPaymentMethod();
        case "CARD":
            throw new Error("CARD FOP not implemented yet");
        default:
            throw new Error("Invalid FOP ".concat(type, " given. \"BILL\" or \"CASH\" expected"));
    }
}
exports.toFOP = toFOP;
