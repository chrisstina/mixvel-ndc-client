import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { StringValue } from "../../../core/request/types";

export class OrderReshopRQ extends AbstractSirenaNDCMessage {
  public Query: {
    OrderID: { _: string }[];
    Reshop?: {
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
    Reprice?: StringValue[];
  }[];

  constructor(orderId: string) {
    super();
    this.Query = [
      {
        OrderID: [{ _: orderId }],
      },
    ];
  }

  get nodeName() {
    return "OrderReshopRQ";
  }

  setReprice() {
    this.Query[0]["Reprice"] = [{ _: "" }];
  }

  setDeleteOrderItems(orderItems: string[]) {
    this.Query[0]["Reshop"] = [{ OrderServicing: [] }];
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
