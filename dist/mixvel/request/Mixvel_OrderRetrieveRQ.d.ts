import { GenericNDCMessage } from "./GenericNDCMessage";
export declare class Mixvel_OrderRetrieveRQ implements GenericNDCMessage {
    get endpoint(): string;
    get xmlns(): {
        "xmlns:o": string;
    };
    get nodeName(): string;
    OrderFilterCriteria: {
        "MixOrder": {
            "MixOrderID": string;
        };
    };
    constructor(offerId: string);
}
