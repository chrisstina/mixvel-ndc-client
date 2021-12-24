"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = void 0;
var documentType_1 = require("../../constants/documentType");
function toMixvel(docType) {
    switch (docType) {
        case "PASSPORT":
        case "INTERNATIONAL":
            return documentType_1.MixvelDocumentType.PASSPORT;
        case "BIRTHDAY_CERTIFICATE":
            return documentType_1.MixvelDocumentType.BIRTHDAY_CERTIFICATE;
        default:
            throw new Error("Unknown document type ".concat(docType));
    }
}
exports.toMixvel = toMixvel;
// export function fromMixvel(docType: MixvelDocumentType): Types;
