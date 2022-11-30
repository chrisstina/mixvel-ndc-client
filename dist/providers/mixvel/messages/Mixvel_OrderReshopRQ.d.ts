import {INDCMessage} from "../../../interfaces/INDCMessage";

declare type UpdateOrder = {
    CancelOrder: {
        OrderRefID: string[];
    };
};
export declare class Mixvel_OrderReshopRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:Reshop": string;
    };
    get nodeName(): string;
    MixOrder: Record<string, unknown>;
    UpdateOrder?: UpdateOrder;
    constructor(offerId: string);
}
export {};
