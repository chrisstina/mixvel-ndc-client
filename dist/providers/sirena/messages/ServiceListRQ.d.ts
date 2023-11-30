import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { PaxDataList } from "../../ticketme/messages/OfferPriceRQ";
declare type ServiceOffer = {
    OfferID: {
        $: {
            Owner: string;
        };
        _: string;
    }[];
    OfferItemIDs: {
        OfferItemID: {
            $: {
                Owner: string;
            };
            _: string;
        }[];
    }[];
};
export declare type OfferRequest = {
    Offers: {
        Offer: ServiceOffer[];
    }[];
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
export {};
