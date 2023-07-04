import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
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
export declare class OfferPriceRQ extends AbstractSirenaNDCMessage {
    Query?: {
        Offer: Offer[];
    };
    Preference?: {
        FarePreferences?: {
            $: {
                PreferencesContext: string;
            };
        };
    };
    DataLists?: {
        PassengerList: PaxDataList;
    };
    constructor();
    get nodeName(): string;
    setUpsell(): void;
}
