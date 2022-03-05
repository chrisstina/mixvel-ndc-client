import { AbstractTicketMeNDCMessage, StringValue } from "./AbstractTicketMeNDCMessage";
import { TicketMeFop } from "../mappers/dictionary/fop";
export declare class CardPaymentMethod {
    readonly PaymentCard: {}[];
}
export declare class CashPaymentMethod {
    readonly Cash: {}[];
}
export declare class OtherPaymentMethod {
    readonly Other: {}[];
}
declare type PaymentMethod = CardPaymentMethod | CashPaymentMethod | OtherPaymentMethod;
declare type Payment = {
    "Type": StringValue[];
    "Method": PaymentMethod[];
    "Amount": {
        "$": {
            "Code": string;
        };
        "_": string;
    }[];
    "Order": {
        "$": {
            "OrderID": string;
            "Owner": string;
        };
    }[];
};
export declare class AirDocIssueRQ extends AbstractTicketMeNDCMessage {
    Query: {
        TicketDocQuantity: StringValue[];
        TicketDocInfo: {
            PassengerReference: StringValue[];
            Payments?: {
                "Payment": Payment[];
            }[];
        }[];
    }[];
    constructor(paxs: string[]);
    get nodeName(): string;
    setPaymentDetails(orderId: string, orderOwner: string, { amount, currency }: {
        amount: string;
        currency: string;
    }, { fopType, fopMethod }: {
        fopType: TicketMeFop;
        fopMethod: PaymentMethod;
    }): void;
}
export {};
