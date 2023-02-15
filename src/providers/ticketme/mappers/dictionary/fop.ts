import { FopType } from "../../../../core/request/types";
import {
  CardPaymentMethod,
  CashPaymentMethod,
  OtherPaymentMethod,
} from "../../messages/AirDocIssueRQ";

export enum TicketMeFop {
  CASH = "CA",
  CARD = "СС",
  OTHER = "MS",
}

export function toTicketMeType(fop: FopType): TicketMeFop {
  switch (fop) {
    case "CARD":
      return TicketMeFop.CARD;
    case "CASH":
      return TicketMeFop.CASH;
    default:
      throw new Error(`Invalid FOP ${fop} given. "CARD" or "CASH" expected`);
  }
}

export function toTicketMeMethod(
  fop: FopType
): CardPaymentMethod | CashPaymentMethod | OtherPaymentMethod {
  switch (fop) {
    case "CARD":
      return new CardPaymentMethod();
    case "CASH":
      return new CashPaymentMethod();
    default:
      throw new Error(`Invalid FOP ${fop} given. "CARD" or "CASH" expected`);
  }
}
