import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
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
    /**
     * for ticket issue request
     */
    PaymentFunctions?: {
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
    /**
     * for order refund request
     */
    ChangeOrder?: Record<string, unknown>;
    constructor(orderId: string);
    setPaymentDetails({ amount, currency }: {
        amount: string;
        currency: string;
    }, fop: OtherPaymentMethod | DirectBill): void;
    setItemsToDelete(orderItems: string[][]): void;
}
