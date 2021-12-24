import { GenericNDCMessage } from "./GenericNDCMessage";
export declare class Mixvel_OrderCancelRQ implements GenericNDCMessage {
    get endpoint(): string;
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    MixOrder: {
        "MixOrderID": string;
    };
    constructor(orderId: string);
}
