import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
export declare class OrderCancelRQ extends AbstractSirenaNDCMessage {
    Query: {
        Order: {
            $: {
                OrderID: string;
                Owner: string;
            };
        };
    }[];
    constructor(orderId: string, offerOwner: string);
    get nodeName(): string;
}
