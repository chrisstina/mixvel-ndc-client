"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketMe = exports.TicketMePTC = void 0;
var TicketMePTC;
(function (TicketMePTC) {
    TicketMePTC["ADULT"] = "ADT";
    TicketMePTC["CHILD"] = "CHD";
    TicketMePTC["INFANT"] = "INF";
    TicketMePTC["WSEATINFANT"] = "CHD";
    TicketMePTC["YOUTH"] = "ADT";
    TicketMePTC["SENIOR"] = "ADT";
    TicketMePTC["DISABLED"] = "ADT";
    TicketMePTC["DISABLEDCHILD"] = "ADT";
    TicketMePTC["ESCORT"] = "ADT";
    TicketMePTC["LARGEFAMILY"] = "ADT";
    TicketMePTC["STATERESIDENT"] = "ADT";
})(TicketMePTC = exports.TicketMePTC || (exports.TicketMePTC = {}));
function toTicketMe(paxCategory) {
    return TicketMePTC[paxCategory];
}
exports.toTicketMe = toTicketMe;
