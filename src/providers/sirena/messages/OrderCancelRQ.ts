import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export class OrderCancelRQ extends AbstractSirenaNDCMessage {
  public Query: {
    Order: {
      $: { OrderID: string; Owner: string };
    };
  }[];

  constructor(orderId: string, offerOwner: string) {
    super();
    this.Query = [{ Order: { $: { OrderID: orderId, Owner: offerOwner } } }];
  }

  get nodeName(): string {
    return "OrderCancelRQ";
  }
}
