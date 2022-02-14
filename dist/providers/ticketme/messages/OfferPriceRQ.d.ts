import { GenericTicketMeNDCMessage } from "./GenericTicketMeNDCMessage";
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
    PassengerRefs: {
        _: string;
    };
};
export declare type PaxDataList = {
    Passenger: {
        $: {
            PassengerID: string;
        };
    };
}[];
export declare class OfferPriceRQ extends GenericTicketMeNDCMessage {
    Query: {
        Offer: Offer[];
    };
    DataLists: {
        PassengerList: PaxDataList;
    };
    constructor(offers: Offer[], dataLists: {
        PassengerList: PaxDataList;
    });
    get nodeName(): string;
}
export {};
