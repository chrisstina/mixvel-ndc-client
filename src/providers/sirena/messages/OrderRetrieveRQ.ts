import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export class OrderRetrieveRQ extends AbstractSirenaNDCMessage {
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
      {
        Filters: [{ OrderID: { $: { Owner: offerOwner }, _: orderId } }],
      },
    ];
  }

  get nodeName(): string {
    return "OrderRetrieveRQ";
  }
}
