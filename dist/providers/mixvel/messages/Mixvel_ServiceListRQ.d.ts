import {INDCMessage} from "../../../interfaces/INDCMessage";

export declare type OfferRequest = {
    "OfferRequest": {
        "Offer": {
            "OfferID": string;
            "OfferItem": {
                "OfferItemID": string;
            }[];
        };
    };
};
export declare type OrderRequest = {
    OrderRequest: {
        MixOrder: {
            MixOrderID: string;
        };
    };
};
export declare class Mixvel_ServiceListRQ implements INDCMessage {
    CoreRequest: OfferRequest | OrderRequest;
    get xmlns(): {
        "xmlns:Service": string;
    };
    get nodeName(): string;
    constructor(CoreRequest: OfferRequest | OrderRequest);
}
