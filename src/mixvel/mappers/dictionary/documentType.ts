import {DocumentType} from "../../../request-params/dictionary/types";
import {MixvelDocumentType} from "../../constants/documentType";

export function toMixvel(docType: DocumentType): MixvelDocumentType {
    switch (docType) {
        case "PASSPORT":
        case "INTERNATIONAL":
            return MixvelDocumentType.PASSPORT
        case "BIRTHDAY_CERTIFICATE":
            return MixvelDocumentType.BIRTHDAY_CERTIFICATE
        default:
            throw new Error(`Unknown document type ${docType}`)
    }
}

// export function fromMixvel(docType: MixvelDocumentType): Types;