import {DocumentType} from "../../../../core/request/types";

export enum TicketmeDocumentType {
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
  VISA = "VI", // Виза
}

export function toTicketMe(docType: DocumentType): TicketmeDocumentType {
  switch (docType) {
    case "REGULAR_PASSPORT_RU":
      return TicketmeDocumentType.REGULAR_PASSPORT;
    case "INTERNATIONAL_PASSPORT_RU":
      return TicketmeDocumentType.INTERNATIONAL_PASSPORT;
    case "BIRTHDAY_CERTIFICATE":
      return TicketmeDocumentType.BIRTHDAY_CERTIFICATE;
    default:
      throw new Error(`Unknown document type ${docType}`);
  }
}
