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
    if (
      this.params.deleteOrderItems &&
      this.params.deleteOrderItems.length > 0
    ) {
      message.setDeleteOrderItems(this.params.deleteOrderItems);
    } else {
      // if no delete or add items, we just need to reprice the order
      message.setReprice();
    }
    message.addParty(this.credentials);
    return message;
  }
}
