import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare class OrderReshopRQ extends AbstractTicketMeNDCMessage {
    Query: {
        OrderID: {
            _: string;
        }[];
        Reprice?: [];
    }[];
    constructor(orderId: string);
    get nodeName(): string;
}
