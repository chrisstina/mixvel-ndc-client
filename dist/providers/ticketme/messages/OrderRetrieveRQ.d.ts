import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare class OrderRetrieveRQ extends AbstractTicketMeNDCMessage {
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
