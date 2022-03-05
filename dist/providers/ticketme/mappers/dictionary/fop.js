"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketMeMethod = exports.toTicketMeType = exports.TicketMeFop = void 0;
var AirDocIssueRQ_1 = require("../../messages/AirDocIssueRQ");
var TicketMeFop;
(function (TicketMeFop) {
    TicketMeFop["CASH"] = "CA";
    TicketMeFop["CARD"] = "\u0421\u0421";
    TicketMeFop["OTHER"] = "MS";
})(TicketMeFop = exports.TicketMeFop || (exports.TicketMeFop = {}));
function toTicketMeType(fop) {
    switch (fop) {
        case "CARD":
            return TicketMeFop.CARD;
        case "CASH":
            return TicketMeFop.CASH;
        default:
            throw new Error("Invalid FOP ".concat(fop, " given. \"CARD\" or \"CASH\" expected"));
    }
}
exports.toTicketMeType = toTicketMeType;
function toTicketMeMethod(fop) {
    switch (fop) {
        case "CARD":
            return new AirDocIssueRQ_1.CardPaymentMethod();
        case "CASH":
            return new AirDocIssueRQ_1.CashPaymentMethod();
        default:
            throw new Error("Invalid FOP ".concat(fop, " given. \"CARD\" or \"CASH\" expected"));
    }
}
exports.toTicketMeMethod = toTicketMeMethod;
