import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_OrderReshopRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:Reshop": string;
    };
    get nodeName(): string;
    MixOrder: Record<string, unknown>;
    constructor(offerId: string);
}
