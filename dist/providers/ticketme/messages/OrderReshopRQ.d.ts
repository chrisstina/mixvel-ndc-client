import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare class OrderReshopRQ extends AbstractTicketMeNDCMessage {
    Query: {
        OrderID: {
            _: string;
        }[];
        Reprice?: Record<string, string>[];
    }[];
    constructor(orderId: string);
    get nodeName(): string;
}
