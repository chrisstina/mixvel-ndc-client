import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {OrderReshopRQ} from "../messages/OrderReshopRQ";

export class RepriceMessageMapper implements IMessageMapper {
  message: OrderReshopRQ;

  constructor(
    public readonly params: OrderRetrieveParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OrderReshopRQ(this.params.orderId);
    this.message.addParty(this.credentials);
  }

  map(): OrderReshopRQ {
    return this.message;
  }
}
