import { GenericNDCMessage } from "../../../interfaces/GenericNDCMessage";
export declare class Mixvel_ServiceListRQ implements GenericNDCMessage {
    get xmlns(): {
        "xmlns:Service": string;
    };
    get nodeName(): string;
    CoreRequest: {};
    constructor(offerId: string, offerItemIds: string[]);
}
