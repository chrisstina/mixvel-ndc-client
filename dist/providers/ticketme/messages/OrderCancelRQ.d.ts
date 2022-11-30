import {AbstractTicketMeNDCMessage} from "./AbstractTicketMeNDCMessage";

export declare class OrderCancelRQ extends AbstractTicketMeNDCMessage {
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
