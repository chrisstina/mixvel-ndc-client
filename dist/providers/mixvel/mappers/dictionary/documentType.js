"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = exports.MixvelDocumentType = void 0;
var MixvelDocumentType;
(function (MixvelDocumentType) {
    MixvelDocumentType["REGULAR_PASSPORT_RU"] = "PS";
    MixvelDocumentType["BIRTHDAY_CERTIFICATE"] = "SR";
    MixvelDocumentType["INTERNATIONAL_PASSPORT_RU"] = "PSP";
    MixvelDocumentType["NATIONAL_PASSPORT"] = "NP";
    MixvelDocumentType["OFFICER_ID"] = "UDL";
    MixvelDocumentType["TEMPORARY_ID"] = "SPU";
    MixvelDocumentType["MILITARY_ID"] = "VB";
    MixvelDocumentType["RESIDENCE"] = "VV";
    MixvelDocumentType["SEAMAN_ID"] = "PM";
    MixvelDocumentType["RETURN_ID"] = "CVV";
})(MixvelDocumentType = exports.MixvelDocumentType || (exports.MixvelDocumentType = {}));
function toMixvel(docType) {
    var code = MixvelDocumentType[docType];
    if (!code) {
        throw new Error("Unsupported document type ".concat(docType));
    }
    return code;
}
exports.toMixvel = toMixvel;
// export function fromMixvel(docType: MixvelDocumentType): Types;
