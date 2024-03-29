import { DocumentType } from "../../../../core/request/types";
export declare enum SirenaDocumentType {
    REGULAR_PASSPORT = "PS",
    INTERNATIONAL_PASSPORT = "PSP",
    BIRTHDAY_CERTIFICATE = "SR",
    DIPLOMATIC_PASSPORT = "DP",
    SEEMAN_ID = "PM",
    SERVICE_PASSPORT = "SP",
    DEPUTY_ID = "UD",
    OFFICER_ID = "UDL",
    MILITARY_ID = "VB",
    RELEASE_ID = "SPO",
    CONVICT_ID = "VUL",
    TEMPORARY_ID = "SPU",
    RETURN_ID = "CVV",
    NATIONAL_PASSPORT = "NP",
    IDENTITY_CARD = "IC",
    RESIDENCE_PERMIT = "VV",
    VISA = "VI"
}
export declare function toSirena(docType: DocumentType): SirenaDocumentType;
