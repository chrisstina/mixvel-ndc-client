import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_OrderRetrieveRQ implements INDCMessage {
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
