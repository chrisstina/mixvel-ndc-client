import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { AirDocIssueRQ, PaymentMethod } from "../messages/AirDocIssueRQ";
import { TicketIssueParams } from "../../../core/request/parameters/TicketIssue";
import {
  TicketMeFop,
  toTicketMeMethod,
  toTicketMeType,
} from "./dictionary/fop";
import { PartyCredentials } from "../TicketMeRequest";

export class IssueTicketMessageMapper implements IMessageMapper {
  message: AirDocIssueRQ;

  constructor(
    public readonly params: TicketIssueParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new AirDocIssueRQ(this.params.paxs || []);
    this.message.addParty(this.credentials);
  }

  map(): AirDocIssueRQ {
    this.setPaymentDetails(
      this.params.orderId,
      this.params.orderOwner || "",
      {
        amount: this.params.payment.amount.toString(),
        currency: this.params.payment.currency,
      },
      {
        fopType: toTicketMeType(this.params.formOfPayment.type),
        fopMethod: toTicketMeMethod(this.params.formOfPayment.type),
      }
    );
    return this.message;
  }

  private setPaymentDetails(
    orderId: string,
    orderOwner: string,
    { amount, currency }: { amount: string; currency: string },
    { fopType, fopMethod }: { fopType: TicketMeFop; fopMethod: PaymentMethod }
  ) {
    if (!this.message.Query[0].TicketDocInfo[0].Payments) {
      this.message.Query[0].TicketDocInfo[0].Payments = [
        {
          Payment: [
            {
              Order: [
                {
                  $: {
                    OrderID: orderId,
                    Owner: orderOwner,
                  },
                },
              ],
              Amount: [
                {
                  $: { Code: currency },
                  _: amount,
                },
              ],
              Method: [fopMethod],
              Type: [{ _: fopType }],
            },
          ],
        },
      ];
    }
  }
}
