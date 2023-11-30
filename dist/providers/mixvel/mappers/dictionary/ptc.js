"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = exports.MixvelPTC = void 0;
var MixvelPTC;
(function (MixvelPTC) {
    MixvelPTC["ADULT"] = "ADT";
    MixvelPTC["CHILD"] = "CNN";
    MixvelPTC["INFANT"] = "INF";
    MixvelPTC["WSEATINFANT"] = "INS";
    MixvelPTC["YOUTH"] = "YTH";
    MixvelPTC["SENIOR"] = "SRC";
    MixvelPTC["DISABLED"] = "DIS";
    MixvelPTC["DISABLEDCHILD"] = "DCD";
    MixvelPTC["ESCORT"] = "ADD";
    MixvelPTC["LARGEFAMILY"] = "PDB";
    MixvelPTC["STATERESIDENT"] = "STR";
})(MixvelPTC = exports.MixvelPTC || (exports.MixvelPTC = {}));
function toMixvel(paxCategory) {
    return MixvelPTC[paxCategory];
}
exports.toMixvel = toMixvel;
