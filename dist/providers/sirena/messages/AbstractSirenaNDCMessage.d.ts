import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
import { PartyCredentials } from "../SirenaRequest";
export declare abstract class AbstractSirenaNDCMessage implements INDCMessage {
    $: {
        Version: string;
    };
    Document: {};
    Party: Party;
    get nodeName(): string;
    get xmlns(): {};
    addParty(party: PartyCredentials): void;
}
