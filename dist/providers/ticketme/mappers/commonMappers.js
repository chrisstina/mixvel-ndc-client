"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketMeGender = exports.genderToTitle = exports.toTicketMeDate = void 0;
var luxon_1 = require("luxon");
function toTicketMeDate(date) {
    return luxon_1.DateTime.fromJSDate(date).toISODate();
}
exports.toTicketMeDate = toTicketMeDate;
function genderToTitle(gender) {
    if (gender === "F") {
        return "Mrs";
    }
    return "Mr";
}
exports.genderToTitle = genderToTitle;
function toTicketMeGender(gender) {
    return gender === "F" ? "Female" : "Male";
}
exports.toTicketMeGender = toTicketMeGender;
