import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { RepriceParams } from "../../../core/request/parameters/Reprice";
import { OrderReshopRQ } from "../messages/OrderReshopRQ";
import { PartyCredentials } from "../SirenaRequest";

export class RepriceMessageMapper implements IMessageMapper {
  constructor(
    public readonly params: RepriceParams,
    public readonly credentials: PartyCredentials
  ) {}

  map(): OrderReshopRQ {
    const message = new OrderReshopRQ(this.params.orderId);
    if (this.params.deleteOrderItems) {
      message.setDeleteOrderItems(this.params.deleteOrderItems);
    }
    message.addParty(this.credentials);
    return message;
  }
}
