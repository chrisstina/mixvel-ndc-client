import { StringValue } from "../../../core/request/types";
import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
export declare type Offer = {
    $: {
        Owner: string;
        OfferID: string;
        ResponseID?: string;
    };
    OfferItem: OfferItem[];
};
export declare type OfferItem = {
    $: {
        OfferItemID: string;
    };
    PassengerRefs: StringValue;
};
export declare type PaxDataList = {
    Passenger: Passenger[];
};
export declare type Passenger = {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
};
export declare class OfferPriceRQ extends AbstractTicketMeNDCMessage {
    Query?: {
        Offer: Offer[];
    };
    DataLists?: {
        PassengerList: PaxDataList;
    };
    constructor();
    get nodeName(): string;
}
