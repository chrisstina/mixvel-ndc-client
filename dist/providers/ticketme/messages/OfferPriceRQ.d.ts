import { AbstractTicketMeNDCMessage, StringValue } from "./AbstractTicketMeNDCMessage";
export declare type Offer = {
    $: {
        Owner: string;
        OfferID: string;
        ResponseID: string;
    };
    OfferItem: OfferItem[];
};
declare type OfferItem = {
    $: {
        OfferItemID: string;
    };
    PassengerRefs: StringValue;
};
export declare type PaxDataList = {
    Passenger: {
        $: {
            PassengerID: string;
        };
    };
}[];
export declare class OfferPriceRQ extends AbstractTicketMeNDCMessage {
    get nodeName(): string;
    Query: {
        Offer: Offer[];
    };
    DataLists: {
        PassengerList: PaxDataList;
    };
    constructor(offers: Offer[], dataLists: {
        PassengerList: PaxDataList;
    });
}
export {};
