import assert from "assert";
import { FopType } from "../../../../core/request/types";
import {
  CashPaymentMethod,
  InvoicePaymentMethod,
} from "../../messages/OrderChangeRQ";

export enum SirenaFop {
  CASH = "CA",
  INVOICE = "IN",
}

export function toSirenaType(fop: FopType): SirenaFop {
  switch (fop) {
    case "BILL":
      return SirenaFop.INVOICE;
    case "CASH":
      return SirenaFop.CASH;
    default:
      throw new Error(`Invalid FOP ${fop} given. "BILL" or "CASH" expected`);
  }
}

export function toSirenaMethod(
  fop: FopType,
  data?: string | Record<string, unknown>
): CashPaymentMethod | InvoicePaymentMethod {
  switch (fop) {
    case "BILL":
      assert(typeof data === "string", "Data for BILL FOP must be string"); // @todo move to validation
      return new InvoicePaymentMethod(data);
    case "CASH":
      return new CashPaymentMethod();
    default:
      throw new Error(`Invalid FOP ${fop} given. "CARD" or "CASH" expected`);
  }
}
