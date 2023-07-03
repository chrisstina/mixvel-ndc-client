import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { StringValue } from "../../../core/request/types";
export declare class OrderReshopRQ extends AbstractSirenaNDCMessage {
    Query: {
        OrderID: {
            _: string;
        }[];
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
    constructor(orderId: string);
    get nodeName(): string;
    setReprice(): void;
    setDeleteOrderItems(orderItems: string[]): void;
}
