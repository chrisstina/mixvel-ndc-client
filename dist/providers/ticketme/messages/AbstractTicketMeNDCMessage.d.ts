import {INDCMessage} from "../../../interfaces/INDCMessage";
import {PartyCredentials} from "../TicketMeRequest";

declare type Party = {
    "Sender": {
        "TravelAgencySender": {
            "AgencyID": {
                "_": string;
            }[];
        }[];
    }[];
}[];
export declare type NodeValue<T> = {
    _: T;
};
export declare type StringValue = NodeValue<string>;
export declare abstract class AbstractTicketMeNDCMessage implements INDCMessage {
    get nodeName(): string;
    get xmlns(): {
        xmlns: string;
        'xmlns:xsi': string;
    };
    $: {
        Version: string;
        xmlns: string;
        'xmlns:xsi': string;
    };
    Document: {};
    Party: Party;
    addParty(party: PartyCredentials): void;
}
export {};
