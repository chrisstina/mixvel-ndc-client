import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../TicketMeRequest";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderCancelRQ } from "../messages/OrderCancelRQ";

export class OrderCancelMessageMapper implements IMessageMapper {
  message: OrderCancelRQ;
  constructor(
    public readonly params: OrderRetrieveParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OrderCancelRQ(
      this.params.orderId,
      this.params.offerOwner || ""
    );
    this.message.addParty(this.credentials);
  }

  map(): OrderCancelRQ {
    return this.message;
  }
}
