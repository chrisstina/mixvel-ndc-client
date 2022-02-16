import {DocumentType} from "../../../../core/request/types";

export enum MixvelDocumentType {
    PASSPORT = "PS",
    BIRTHDAY_CERTIFICATE = "SR"
}

export function toMixvel(docType: DocumentType): MixvelDocumentType {
    switch (docType) {
        case "REGULAR_PASSPORT":
            return MixvelDocumentType.PASSPORT
        case "BIRTHDAY_CERTIFICATE":
            return MixvelDocumentType.BIRTHDAY_CERTIFICATE
        default:
            throw new Error(`Unsupported document type ${docType}`)
    }
}

// export function fromMixvel(docType: MixvelDocumentType): Types;