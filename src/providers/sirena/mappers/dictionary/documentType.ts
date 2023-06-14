import { DocumentType } from "../../../../core/request/types";

// Группа авиакомпаний PSS Леонардо может использовать следующие типы документов, действующие на территории РФ:
export enum SirenaDocumentType {
  REGULAR_PASSPORT = "PS", // Общегражданский паспорт
  INTERNATIONAL_PASSPORT = "PSP", // Заграничный паспорт РФ
  BIRTHDAY_CERTIFICATE = "SR", // Свидетельство о рождении
  DIPLOMATIC_PASSPORT = "DP", //  Дипломатический паспорт
  SEEMAN_ID = "PM", // Паспорт моряка (удостоверение личности моряка)
  SERVICE_PASSPORT = "SP", // Служебный паспорт
  DEPUTY_ID = "UD", // Удостоверение депутата совета федерации или депутата государственной думы федерального собрания
  OFFICER_ID = "UDL", // Удостоверение личности военнослужащего (офицеры,прапорщики, мичманы, курсанты)
  MILITARY_ID = "VB", // Военный билет для солдат, матросов, сержантов и старшин, проходящих службу по призыву или по контракту, а также курсантов
  RELEASE_ID = "SPO", // Справка об освобождении из мест лишения свободы
  CONVICT_ID = "VUL", // Удостоверение, выдаваемое осужденному, получившему разрешение на длительный или краткосрочный выезд за пределы мест лишения свободы
  TEMPORARY_ID = "SPU", // Временное удостоверение личности, выдаваемое гражданину РФ органами внутренних дел при утрате или замене или беженцам
  RETURN_ID = "CVV", // Свидетельство на возвращение в страны СНГ
  NATIONAL_PASSPORT = "NP", // Национальный паспорт
  IDENTITY_CARD = "IC", // Идентификационая карта,
  RESIDENCE_PERMIT = "VV", // Вид на жительство
  VISA = "VI", // Виза
}

export function toSirena(docType: DocumentType): SirenaDocumentType {
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
      throw new Error(`Unknown document type ${docType}`);
  }
}
