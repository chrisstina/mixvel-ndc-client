import { AnonymousTraveler, Cabin, OriginDestination, Passenger, PaxCategory, FopType } from "./types";
export declare type SearchParams = {
    originDestinations: OriginDestination[];
    travelers: AnonymousTraveler[];
    cabin: Cabin;
    preferredCarriers: string[] | null;
};
export declare type AuthParams = {
    login: string;
    password: string;
    structureId: string;
};
export declare type PriceParams = {
    offerId: string;
    offerItemIds: string[];
};
export declare type BookParams = {
    offerId: string;
    offerItemIds: Array<{
        id: string;
        ptc: PaxCategory;
    }>;
    passengers: Array<Passenger>;
};
export declare type TicketIssueParams = {
    orderId: string;
    payment: {
        amount: number;
        currency: string;
    };
    formOfPayment: {
        type: FopType;
        data?: string | {};
    };
};
export declare type OrderRetrieveParams = {
    orderId: string;
};