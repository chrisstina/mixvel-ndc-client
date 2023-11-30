import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
export declare class OrderRetrieveRQ extends AbstractSirenaNDCMessage {
    Query: {
        Filters: {
            OrderID: {
                $: {
                    Owner: string;
                };
                _: string;
            };
        }[];
    }[];
    constructor(orderId: string, offerOwner: string);
    get nodeName(): string;
}
