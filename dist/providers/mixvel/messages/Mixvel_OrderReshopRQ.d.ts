import {INDCMessage} from "../../../interfaces/INDCMessage";

declare type UpdateOrder = {
    CancelOrder: {
        OrderRefID: Iterable<string>;
    };
};
export declare class Mixvel_OrderReshopRQ implements INDCMessage {
    MixOrder: Record<string, unknown>;
    UpdateOrder?: UpdateOrder;
    constructor(offerId: string);
    get xmlns(): {
        "xmlns:Reshop": string;
    };
    get nodeName(): string;
}
export {};
