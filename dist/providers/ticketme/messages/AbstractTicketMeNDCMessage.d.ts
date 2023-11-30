import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
import { PartyCredentials } from "../TicketMeRequest";
export declare abstract class AbstractTicketMeNDCMessage implements INDCMessage {
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
    addParty(party: PartyCredentials): void;
}
