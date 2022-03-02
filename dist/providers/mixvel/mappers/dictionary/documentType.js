"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = exports.MixvelDocumentType = exports.SupportedDocumentTypes = void 0;
var SupportedDocumentTypes;
(function (SupportedDocumentTypes) {
    SupportedDocumentTypes[SupportedDocumentTypes["REGULAR_PASSPORT"] = 0] = "REGULAR_PASSPORT";
    SupportedDocumentTypes[SupportedDocumentTypes["BIRTHDAY_CERTIFICATE"] = 1] = "BIRTHDAY_CERTIFICATE";
})(SupportedDocumentTypes = exports.SupportedDocumentTypes || (exports.SupportedDocumentTypes = {}));
var MixvelDocumentType;
(function (MixvelDocumentType) {
    MixvelDocumentType["PASSPORT"] = "PS";
    MixvelDocumentType["BIRTHDAY_CERTIFICATE"] = "SR";
})(MixvelDocumentType = exports.MixvelDocumentType || (exports.MixvelDocumentType = {}));
function toMixvel(docType) {
    switch (docType) {
        case "REGULAR_PASSPORT":
            return MixvelDocumentType.PASSPORT;
        case "BIRTHDAY_CERTIFICATE":
            return MixvelDocumentType.BIRTHDAY_CERTIFICATE;
        default:
            throw new Error("Unsupported document type ".concat(docType));
    }
}
exports.toMixvel = toMixvel;
// export function fromMixvel(docType: MixvelDocumentType): Types;
