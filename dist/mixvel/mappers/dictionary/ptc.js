"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = void 0;
var ptc_1 = require("../../constants/ptc");
function toMixvel(paxCategory) {
    return ptc_1.PTC[paxCategory];
}
exports.toMixvel = toMixvel;
// export function fromMixvel(docType: MixvelDocumentType): Types;
