import {DocumentType} from "../../../../core/request/types";

export declare enum MixvelDocumentType {
    REGULAR_PASSPORT_RU = "PS",
    BIRTHDAY_CERTIFICATE = "SR",
    INTERNATIONAL_PASSPORT_RU = "PSP",
    NATIONAL_PASSPORT = "NP",
    OFFICER_ID = "UDL",
    TEMPORARY_ID = "SPU",
    MILITARY_ID = "VB",
    RESIDENCE = "VV",
    SEAMAN_ID = "PM",
    RETURN_ID = "CVV"
}
export declare function toMixvel(docType: DocumentType): MixvelDocumentType;
