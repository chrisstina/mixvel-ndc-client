import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_OrderRulesRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    RulesCoreRequest: Record<string, unknown>;
    constructor(offerId: string, offerItemIds: string[]);
}
