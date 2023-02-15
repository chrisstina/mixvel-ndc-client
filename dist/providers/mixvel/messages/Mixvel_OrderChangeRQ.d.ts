import {INDCMessage} from "../../../interfaces/INDCMessage";
import {AccountableDoc, DirectBill, OtherPaymentMethod} from "./Mixvel_CommonTypes";

export declare class Mixvel_OrderChangeRQ implements INDCMessage {
    /**
     * for ticket issue request
     */
    PaymentFunctions?: {
        PaymentProcessingDetails: {
            Amount: {
                _: string;
                $: {
                    CurCode: string;
                };
            };
            PaymentProcessingDetailsPaymentMethod: OtherPaymentMethod | DirectBill | AccountableDoc;
        };
    };
    /**
     * for order refund or split requests
     */
    ChangeOrder?: Record<string, unknown>;
    MixOrder?: {
        MixOrderID: string;
    };
    constructor(orderId?: string);
    get endpoint(): string;
    get xmlns(): {
        "xmlns:o": string;
    };
    get nodeName(): string;
    setMixOrder(orderId: string): void;
}
