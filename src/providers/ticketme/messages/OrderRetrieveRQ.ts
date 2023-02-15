import {AbstractTicketMeNDCMessage} from "./AbstractTicketMeNDCMessage";

export class OrderRetrieveRQ extends AbstractTicketMeNDCMessage {
  public Query: {
    Filters: {
      OrderID: {
        $: { Owner: string };
        _: string;
      };
    }[];
  }[];

  constructor(orderId: string, offerOwner: string) {
    super();
    this.Query = [
      { Filters: [{ OrderID: { $: { Owner: offerOwner }, _: orderId } }] },
    ];
  }

  get nodeName(): string {
    return "OrderRetrieveRQ";
  }
}
