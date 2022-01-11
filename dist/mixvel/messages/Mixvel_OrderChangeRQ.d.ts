import { GenericNDCMessage } from "./GenericNDCMessage";
export declare class OtherPaymentMethod {
    readonly OtherPaymentMethod: null;
}
export declare class DirectBill {
    constructor(billInfo: string);
}
export declare class Mixvel_OrderChangeRQ implements GenericNDCMessage {
    get endpoint(): string;
    get xmlns(): {
        "xmlns:o": string;
    };
    get nodeName(): string;
    MixOrder: {
        MixOrderID: string;
    };
    PaymentFunctions: {
        "PaymentProcessingDetails": {
            "Amount": {
                "_": string;
                "$": {
                    "CurCode": string;
                };
            };
            "PaymentProcessingDetailsPaymentMethod": OtherPaymentMethod | DirectBill;
        };
    };
    constructor(orderId: string, { amount, currency }: {
        amount: string;
        currency: string;
    }, fop: OtherPaymentMethod | DirectBill);
}
