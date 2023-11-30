"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSirena = exports.SirenaDocumentType = void 0;
// Группа авиакомпаний PSS Леонардо может использовать следующие типы документов, действующие на территории РФ:
var SirenaDocumentType;
(function (SirenaDocumentType) {
    SirenaDocumentType["REGULAR_PASSPORT"] = "PS";
    SirenaDocumentType["INTERNATIONAL_PASSPORT"] = "PSP";
    SirenaDocumentType["BIRTHDAY_CERTIFICATE"] = "SR";
    SirenaDocumentType["DIPLOMATIC_PASSPORT"] = "DP";
    SirenaDocumentType["SEEMAN_ID"] = "PM";
    SirenaDocumentType["SERVICE_PASSPORT"] = "SP";
    SirenaDocumentType["DEPUTY_ID"] = "UD";
    SirenaDocumentType["OFFICER_ID"] = "UDL";
    SirenaDocumentType["MILITARY_ID"] = "VB";
    SirenaDocumentType["RELEASE_ID"] = "SPO";
    SirenaDocumentType["CONVICT_ID"] = "VUL";
    SirenaDocumentType["TEMPORARY_ID"] = "SPU";
    SirenaDocumentType["RETURN_ID"] = "CVV";
    SirenaDocumentType["NATIONAL_PASSPORT"] = "NP";
    SirenaDocumentType["IDENTITY_CARD"] = "IC";
    SirenaDocumentType["RESIDENCE_PERMIT"] = "VV";
    SirenaDocumentType["VISA"] = "VI";
})(SirenaDocumentType = exports.SirenaDocumentType || (exports.SirenaDocumentType = {}));
function toSirena(docType) {
    switch (docType) {
        case "REGULAR_PASSPORT_RU":
            return SirenaDocumentType.REGULAR_PASSPORT;
        case "INTERNATIONAL_PASSPORT_RU":
            return SirenaDocumentType.INTERNATIONAL_PASSPORT;
        case "BIRTHDAY_CERTIFICATE":
            return SirenaDocumentType.BIRTHDAY_CERTIFICATE;
        case "NATIONAL_PASSPORT":
            return SirenaDocumentType.NATIONAL_PASSPORT;
        case "RESIDENCE":
            return SirenaDocumentType.RESIDENCE_PERMIT;
        case "OFFICER_ID":
            return SirenaDocumentType.OFFICER_ID;
        case "SEAMAN_ID":
            return SirenaDocumentType.SEEMAN_ID;
        case "TEMPORARY_ID":
            return SirenaDocumentType.TEMPORARY_ID;
        case "MILITARY_ID":
            return SirenaDocumentType.MILITARY_ID;
        default:
            throw new Error("Unknown document type ".concat(docType));
    }
}
exports.toSirena = toSirena;
