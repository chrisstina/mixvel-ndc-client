"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSirena = exports.SirenaPTC = void 0;
var SirenaPTC;
(function (SirenaPTC) {
    SirenaPTC["ADULT"] = "ADT";
    SirenaPTC["CHILD"] = "CNN";
    SirenaPTC["INFANT"] = "INF";
    SirenaPTC["WSEATINFANT"] = "CNN";
    SirenaPTC["YOUTH"] = "ADT";
    SirenaPTC["SENIOR"] = "ADT";
    SirenaPTC["DISABLED"] = "ADT";
    SirenaPTC["DISABLEDCHILD"] = "ADT";
    SirenaPTC["ESCORT"] = "ADT";
    SirenaPTC["LARGEFAMILY"] = "ADT";
    SirenaPTC["STATERESIDENT"] = "ADT";
})(SirenaPTC = exports.SirenaPTC || (exports.SirenaPTC = {}));
function toSirena(paxCategory) {
    return SirenaPTC[paxCategory];
}
exports.toSirena = toSirena;
