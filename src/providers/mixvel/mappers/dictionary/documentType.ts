import {DocumentType} from "../../../../core/request/types";

export enum MixvelDocumentType {
  REGULAR_PASSPORT_RU = "PS",
  BIRTHDAY_CERTIFICATE = "SR",
  INTERNATIONAL_PASSPORT_RU = "PSP",
  NATIONAL_PASSPORT = "NP",
  OFFICER_ID = "UDL",
  TEMPORARY_ID = "SPU",
  MILITARY_ID = "VB",
  RESIDENCE = "VV",
  SEAMAN_ID = "PM",
  RETURN_ID = "CVV",
}

export function toMixvel(docType: DocumentType): MixvelDocumentType {
  const code = MixvelDocumentType[docType];
  if (!code) {
    throw new Error(`Unsupported document type ${docType}`);
  }
  return code;
}

// export function fromMixvel(docType: MixvelDocumentType): Types;
