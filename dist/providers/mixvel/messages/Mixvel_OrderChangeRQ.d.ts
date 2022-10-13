import {INDCMessage} from "../../../interfaces/INDCMessage";
import {AccountableDoc, DirectBill, OtherPaymentMethod} from "./Mixvel_CommonTypes";

export declare class Mixvel_OrderChangeRQ implements INDCMessage {
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
            "PaymentProcessingDetailsPaymentMethod": OtherPaymentMethod | DirectBill | AccountableDoc;
        };
    };
    /**
     * for order refund request
     */
    ChangeOrder?: Record<string, unknown>;
    constructor(orderId: string);
}
