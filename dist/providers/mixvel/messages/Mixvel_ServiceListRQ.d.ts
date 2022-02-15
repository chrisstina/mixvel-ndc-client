import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_ServiceListRQ implements INDCMessage {
    get xmlns(): {
        "xmlns:Service": string;
    };
    get nodeName(): string;
    CoreRequest: {};
    constructor(offerId: string, offerItemIds: string[]);
}
