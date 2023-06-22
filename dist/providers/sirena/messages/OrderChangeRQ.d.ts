import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
export declare class CardPaymentMethod {
    readonly PaymentCard: {}[];
}
export declare class CashPaymentMethod {
    readonly Cash: {
        $: {
            CashInd: boolean;
        };
    }[];
}
export declare class InvoicePaymentMethod {
    readonly Other: {
        Remarks: {
            Remark: StringValue[];
        }[];
    }[];
    constructor(data: string);
}
export declare type PaymentMethod = CardPaymentMethod | CashPaymentMethod | InvoicePaymentMethod;
declare type Payment = {
    Type: StringValue[];
    Method: PaymentMethod[];
    Amount: {
        $: {
            Code: string;
        };
        _: string;
    }[];
};
export declare class OrderChangeRQ extends AbstractSirenaNDCMessage {
    Query: {
        OrderID: {
            $: {
                Owner: string;
            };
            _: string;
        }[];
        Payments: {
            Payment: Payment[];
        }[];
        DataLists: {
            PassengerList: {}[];
            ContactList: {}[];
        }[];
    }[];
    constructor(orderId: string, offerOwner: string);
    get nodeName(): string;
}
export {};
