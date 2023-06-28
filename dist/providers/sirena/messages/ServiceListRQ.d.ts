import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { PaxDataList, Offer } from "../../ticketme/messages/OfferPriceRQ";
export declare type OfferRequest = {
    Offer: Offer[];
};
export declare type OrderRequest = {
    OrderID: {
        $: {
            Owner: string;
        };
        _: string;
    };
};
export declare class ServiceListRQ extends AbstractSirenaNDCMessage {
    readonly ShoppingResponseID: {
        ResponseID: {
            _: string;
        }[];
    }[] | undefined;
    readonly Query: OfferRequest | OrderRequest;
    readonly DataLists?: {
        PassengerList: PaxDataList;
    };
    constructor(query: OfferRequest | OrderRequest, dataLists?: {
        PassengerList: PaxDataList;
    }, shoppingResponseId?: string);
    get nodeName(): string;
}
