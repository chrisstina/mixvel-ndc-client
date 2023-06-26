import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { PaxDataList, Offer } from "../../ticketme/messages/OfferPriceRQ";
export declare class ServiceListRQ extends AbstractSirenaNDCMessage {
    Query?: {
        Offer: Offer[];
    };
    DataLists?: {
        PassengerList: PaxDataList;
    };
    get nodeName(): string;
}
