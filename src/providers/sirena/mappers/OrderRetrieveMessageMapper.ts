import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../SirenaRequest";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderRetrieveRQ } from "../messages/OrderRetrieveRQ";

export class OrderRetrieveMessageMapper implements IMessageMapper {
  message: OrderRetrieveRQ;

  constructor(
    public readonly params: OrderRetrieveParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OrderRetrieveRQ(
      this.params.orderId,
      this.params.offerOwner || ""
    );
    this.message.addParty(this.credentials);
  }

  map(): OrderRetrieveRQ {
    return this.message;
  }
}
