"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketMe = exports.TicketmeDocumentType = void 0;
var TicketmeDocumentType;
(function (TicketmeDocumentType) {
    TicketmeDocumentType["REGULAR_PASSPORT"] = "PS";
    TicketmeDocumentType["INTERNATIONAL_PASSPORT"] = "PSP";
    TicketmeDocumentType["BIRTHDAY_CERTIFICATE"] = "SR";
    TicketmeDocumentType["DIPLOMATIC_PASSPORT"] = "DP";
    TicketmeDocumentType["SEEMAN_ID"] = "PM";
    TicketmeDocumentType["SERVICE_PASSPORT"] = "SP";
    TicketmeDocumentType["DEPUTY_ID"] = "UD";
    TicketmeDocumentType["OFFICER_ID"] = "UDL";
    TicketmeDocumentType["MILITARY_ID"] = "VB";
    TicketmeDocumentType["RELEASE_ID"] = "SPO";
    TicketmeDocumentType["CONVICT_ID"] = "VUL";
    TicketmeDocumentType["TEMPORARY_ID"] = "SPU";
    TicketmeDocumentType["RETURN_ID"] = "CVV";
    TicketmeDocumentType["NATIONAL_PASSPORT"] = "NP";
    TicketmeDocumentType["IDENTITY_CARD"] = "IC";
    TicketmeDocumentType["VISA"] = "VI"; // Виза
})(TicketmeDocumentType = exports.TicketmeDocumentType || (exports.TicketmeDocumentType = {}));
function toTicketMe(docType) {
    switch (docType) {
        case "REGULAR_PASSPORT_RU":
            return TicketmeDocumentType.REGULAR_PASSPORT;
        case "INTERNATIONAL_PASSPORT_RU":
            return TicketmeDocumentType.INTERNATIONAL_PASSPORT;
        case "BIRTHDAY_CERTIFICATE":
            return TicketmeDocumentType.BIRTHDAY_CERTIFICATE;
        default:
            throw new Error("Unknown document type ".concat(docType));
    }
}
exports.toTicketMe = toTicketMe;
