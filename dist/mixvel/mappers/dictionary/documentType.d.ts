import { DocumentType } from "../../../request/types";
export declare enum MixvelDocumentType {
    PASSPORT = "PS",
    BIRTHDAY_CERTIFICATE = "SR"
}
export declare function toMixvel(docType: DocumentType): MixvelDocumentType;
