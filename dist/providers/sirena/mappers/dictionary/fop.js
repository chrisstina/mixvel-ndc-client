"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSirenaMethod = exports.toSirenaType = exports.SirenaFop = void 0;
var assert_1 = __importDefault(require("assert"));
var OrderChangeRQ_1 = require("../../messages/OrderChangeRQ");
var SirenaFop;
(function (SirenaFop) {
    SirenaFop["CASH"] = "CA";
    SirenaFop["INVOICE"] = "IN";
})(SirenaFop = exports.SirenaFop || (exports.SirenaFop = {}));
function toSirenaType(fop) {
    switch (fop) {
        case "BILL":
            return SirenaFop.INVOICE;
        case "CASH":
            return SirenaFop.CASH;
        default:
            throw new Error("Invalid FOP ".concat(fop, " given. \"BILL\" or \"CASH\" expected"));
    }
}
exports.toSirenaType = toSirenaType;
function toSirenaMethod(fop, data) {
    switch (fop) {
        case "BILL":
            (0, assert_1.default)(typeof data === "string", "Data for BILL FOP must be string"); // @todo move to validation
            return new OrderChangeRQ_1.InvoicePaymentMethod(data);
        case "CASH":
            return new OrderChangeRQ_1.CashPaymentMethod();
        default:
            throw new Error("Invalid FOP ".concat(fop, " given. \"CARD\" or \"CASH\" expected"));
    }
}
exports.toSirenaMethod = toSirenaMethod;
