import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { TicketIssueParams } from "../../../core/request/parameters/TicketIssue";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
import {
  AccountableDoc,
  DirectBill,
  OtherPaymentMethod,
} from "../messages/Mixvel_CommonTypes";
import { toFOP } from "./commonMappers";

export class IssueOrderMessageMapper implements IMessageMapper {
  message: Mixvel_OrderChangeRQ;

  constructor(public readonly params: TicketIssueParams) {
    this.message = new Mixvel_OrderChangeRQ(this.params.orderId);
  }

  map(): Mixvel_OrderChangeRQ {
    this.setPaymentDetails(
      {
        amount: this.params.payment.amount.toString(),
        currency: this.params.payment.currency,
      },
      toFOP(this.params.formOfPayment)
    );
    return this.message;
  }

  private setPaymentDetails(
    { amount, currency }: { amount: string; currency: string },
    fop: OtherPaymentMethod | DirectBill | AccountableDoc
  ) {
    this.message.PaymentFunctions = {
      PaymentProcessingDetails: {
        Amount: { _: amount, $: { CurCode: currency } },
        PaymentProcessingDetailsPaymentMethod: fop,
      },
    };
  }
}
