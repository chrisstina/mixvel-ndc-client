import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
export declare class OrderReshopRQ extends AbstractSirenaNDCMessage {
    Query: {
        OrderID: {
            _: string;
        }[];
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
    constructor(orderId: string);
    get nodeName(): string;
    setDeleteOrderItems(orderItems: string[]): void;
}
