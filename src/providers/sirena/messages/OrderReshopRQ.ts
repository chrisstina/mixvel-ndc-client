import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export class OrderReshopRQ extends AbstractSirenaNDCMessage {
  public Query: {
    OrderID: { _: string }[];
    Reshop: {
      OrderServicing: {
        Delete?: {
          OrderItem: {
            $: {
              OrderItemID: string;
            };
          }[];
        }[];
      }[];
    }[];
  }[];

  constructor(orderId: string) {
    super();
    this.Query = [
      {
        OrderID: [{ _: orderId }],
        Reshop: [{ OrderServicing: [] }],
      },
    ];
  }

  get nodeName() {
    return "OrderReshopRQ";
  }

  setDeleteOrderItems(orderItems: string[]) {
    this.Query[0].Reshop[0].OrderServicing.push({
      Delete: [
        {
          OrderItem: orderItems.map((id) => {
            return {
              $: {
                OrderItemID: id,
              },
            };
          }),
        },
      ],
    });
  }
}
