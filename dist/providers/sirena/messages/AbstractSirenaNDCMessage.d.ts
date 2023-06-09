import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
export declare abstract class AbstractSirenaNDCMessage implements INDCMessage {
    $: {
        Version: string;
        xmlns: string;
        "xmlns:xsi": string;
    };
    Document: {};
    Party: Party;
    get nodeName(): string;
    get xmlns(): {
        xmlns: string;
        "xmlns:xsi": string;
    };
    addParty(party: {
        agencyId: string;
    }): void;
}
