import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_OrderCancelRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    MixOrder: {
        "MixOrderID": string;
    };
    constructor(orderId: string);
}
