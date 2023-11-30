import { StringValue } from "../../../core/request/types";
import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare class CardPaymentMethod {
    readonly PaymentCard: {}[];
}
export declare class CashPaymentMethod {
    readonly Cash: {}[];
}
export declare class OtherPaymentMethod {
    readonly Other: {}[];
}
export declare type PaymentMethod = CardPaymentMethod | CashPaymentMethod | OtherPaymentMethod;
declare type Payment = {
    Type: StringValue[];
    Method: PaymentMethod[];
    Amount: {
        $: {
            Code: string;
        };
        _: string;
    }[];
    Order: {
        $: {
            OrderID: string;
            Owner: string;
        };
    }[];
};
export declare class AirDocIssueRQ extends AbstractTicketMeNDCMessage {
    Query: {
        TicketDocQuantity: StringValue[];
        TicketDocInfo: {
            PassengerReference: StringValue[];
            Payments?: {
                Payment: Payment[];
            }[];
        }[];
    }[];
    constructor(paxs: string[]);
    get nodeName(): string;
}
export {};
