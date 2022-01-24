"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAge = exports.toMixvelDate = void 0;
var luxon_1 = require("luxon");
function toMixvelDate(date) {
    return luxon_1.DateTime.fromJSDate(date).toISODate();
}
exports.toMixvelDate = toMixvelDate;
function toAge(date) {
    return Math.abs(luxon_1.DateTime.fromJSDate(date).diffNow("years").years).toFixed(0);
}
exports.toAge = toAge;
