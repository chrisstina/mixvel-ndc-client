"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSirena = exports.SirenaCabin = void 0;
/**
 * Возможные значения кода салона:
 *
 * Р – салон премиального первого класса;
 * PADIS 1 или F - салон первого класса;
 * J – салон премиум бизнес-класса;
 * PADIS 2 или С - салон бизнес-класса;
 * PADIS 4 или W - салон премиального эконом-класса;
 * PADIS 5 или Y – салон эконом-класса.
 */
var SirenaCabin;
(function (SirenaCabin) {
    SirenaCabin["ECONOMY"] = "Y";
    SirenaCabin["BUSINESS"] = "\u0421";
})(SirenaCabin = exports.SirenaCabin || (exports.SirenaCabin = {}));
function toSirena(cabin) {
    return SirenaCabin[cabin] || SirenaCabin.ECONOMY;
}
exports.toSirena = toSirena;
