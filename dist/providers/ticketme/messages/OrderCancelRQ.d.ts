import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare class OrderCancelRQ extends AbstractTicketMeNDCMessage {
    Query: {
        OrderID: {
            $: {
                Owner: string;
            };
            _: string;
        };
    }[];
    constructor(orderId: string, offerOwner: string);
    get nodeName(): string;
}
