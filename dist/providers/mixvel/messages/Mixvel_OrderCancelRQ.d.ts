import {INDCMessage} from "../../../interfaces/INDCMessage";

export declare class Mixvel_OrderCancelRQ implements INDCMessage {
    MixOrder: {
        MixOrderID: string;
    };
    constructor(orderId: string);
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
}
