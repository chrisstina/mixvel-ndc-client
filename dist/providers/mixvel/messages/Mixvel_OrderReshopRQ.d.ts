import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
export declare class Mixvel_OrderReshopRQ implements GenericNDCMessage {
    get xmlns(): {
        "xmlns:Reshop": string;
    };
    get nodeName(): string;
    MixOrder: Record<string, unknown>;
    constructor(offerId: string);
}
