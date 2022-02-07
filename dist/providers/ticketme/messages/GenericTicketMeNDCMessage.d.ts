import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
import { PartyCredentials } from "../TicketMeRequest";
declare type Party = {
    "Sender": {
        "TravelAgencySender": {
            "AgencyID": {
                "_": string;
            }[];
        }[];
    }[];
}[];
export declare type StringValue = {
    _: string;
};
export declare class GenericTicketMeNDCMessage implements GenericNDCMessage {
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
