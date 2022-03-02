import { DocumentType } from "../../../../core/request/types";
export declare enum SupportedDocumentTypes {
    "REGULAR_PASSPORT" = 0,
    "BIRTHDAY_CERTIFICATE" = 1
}
export declare enum MixvelDocumentType {
    PASSPORT = "PS",
    BIRTHDAY_CERTIFICATE = "SR"
}
export declare function toMixvel(docType: DocumentType): MixvelDocumentType;
