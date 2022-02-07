import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
export declare class Mixvel_OrderRulesRQ implements GenericNDCMessage {
    get xmlns(): {
        "xmlns:m": string;
    };
    get nodeName(): string;
    RulesCoreRequest: {};
    constructor(offerId: string, offerItemIds: string[]);
}
