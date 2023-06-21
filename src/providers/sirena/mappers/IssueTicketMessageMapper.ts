import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SirenaTicketIssueParams } from "../request/parameters/TicketIssue";
import { OrderChangeRQ, PaymentMethod } from "../messages/OrderChangeRQ";
import { PartyCredentials } from "../SirenaRequest";
import { SirenaFop, toSirenaMethod, toSirenaType } from "./dictionary/fop";

export class IssueTicketMessageMapper implements IMessageMapper {
  message: OrderChangeRQ;

  constructor(
    public readonly params: SirenaTicketIssueParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OrderChangeRQ(params.orderId, params.orderOwner);
    this.message.addParty(this.credentials);
  }

  map(): OrderChangeRQ {
    this.setPaymentDetails(
      {
        amount: this.params.payment.amount.toString(),
        currency: this.params.payment.currency,
      },
      {
        fopType: toSirenaType(this.params.formOfPayment.type),
        fopMethod: toSirenaMethod(
          this.params.formOfPayment.type,
          this.params.formOfPayment.data
        ),
      }
    );
    return this.message;
  }

  private setPaymentDetails(
    { amount, currency }: { amount: string; currency: string },
    { fopType, fopMethod }: { fopType: SirenaFop; fopMethod: PaymentMethod }
  ) {
    this.message.Query[0].Payments.push({
      Payment: [
        {
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
    });
  }
}
