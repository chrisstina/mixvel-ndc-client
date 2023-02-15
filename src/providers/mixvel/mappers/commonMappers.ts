import assert from "assert";
import {DateTime} from "luxon";
import {FopType} from "../../../core/request/types";
import {DirectBill, OtherPaymentMethod} from "../messages/Mixvel_CommonTypes";

export function toMixvelDate(date: Date) {
  return DateTime.fromJSDate(date).toISODate();
}

export function toAge(date: Date): string {
  return Math.abs(DateTime.fromJSDate(date).diffNow("years").years).toFixed(0);
}

export function toFOP({
  type,
  data,
}: {
  type: FopType;
  data?: string | Record<string, unknown>;
}): OtherPaymentMethod | DirectBill {
  switch (type) {
    case "BILL":
      assert(typeof data === "string", "Data for BILL FOP must be string"); // @todo move to validation
      return new DirectBill(data);
    case "CASH":
      return new OtherPaymentMethod();
    case "CARD":
      throw new Error(`CARD FOP not implemented yet`);
    default:
      throw new Error(`Invalid FOP ${type} given. "BILL" or "CASH" expected`);
  }
}
