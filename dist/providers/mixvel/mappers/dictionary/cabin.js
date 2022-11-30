"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = exports.MixvelCabin = void 0;
var MixvelCabin;
(function (MixvelCabin) {
    MixvelCabin["ECONOMY"] = "Economy";
    MixvelCabin["BUSINESS"] = "Business";
})(MixvelCabin = exports.MixvelCabin || (exports.MixvelCabin = {}));
function toMixvel(cabin) {
    return MixvelCabin[cabin] || MixvelCabin.ECONOMY;
}
exports.toMixvel = toMixvel;
