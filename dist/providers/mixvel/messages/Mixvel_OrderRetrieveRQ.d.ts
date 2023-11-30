import { INDCMessage } from "../../../interfaces/INDCMessage";
export declare class Mixvel_OrderRetrieveRQ implements INDCMessage {
    OrderFilterCriteria: {
        MixOrder: {
            MixOrderID: string;
        };
    };
    constructor(offerId: string);
    get xmlns(): {
        "xmlns:o": string;
    };
    get nodeName(): string;
}
