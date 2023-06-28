import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { SirenaPTC } from "../mappers/dictionary/ptc";
export declare class CardPaymentMethod {
    readonly PaymentCard: {}[];
}
export declare class CashPaymentMethod {
    readonly Cash: {
        $: {
            CashInd: boolean;
        };
    }[];
}
export declare class InvoicePaymentMethod {
    readonly Other: {
        Remarks: {
            Remark: StringValue[];
        }[];
    }[];
    constructor(data: string);
}
export declare type PaymentMethod = CardPaymentMethod | CashPaymentMethod | InvoicePaymentMethod;
declare type Payment = {
    Type: StringValue[];
    Method: PaymentMethod[];
    Amount: {
        $: {
            Code: string;
        };
        _: string;
    }[];
};
declare type Individual = {
    GivenName: StringValue[];
    Surname: StringValue[];
    MiddleName?: StringValue[];
    Birthdate: StringValue[];
};
export declare class OrderPax {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
    Individual: Individual[];
    InfantRef?: StringValue[];
    constructor(id: string, ptc: SirenaPTC, individual: Individual, infantRef?: string);
}
export declare class OrderChangeOffer {
    readonly $: {
        ResponseID: string;
        Owner: string;
        OfferID: string;
    };
    readonly OfferItem: OrderChangeOfferItem[];
    constructor(responseId: string, owner: string, offerId: string);
}
export declare class OrderChangeOfferItem {
    readonly $: {
        OfferItemID: string;
    };
    readonly PassengerRefs: StringValue[];
    readonly ALaCarteSelection: {
        SegmentID: StringValue[];
        Quantity: StringValue[];
    }[];
    constructor(offerItemId: string, passengerRefs: string, segmentRefs: string, quantity?: number);
}
export declare class OrderChangeRQ extends AbstractSirenaNDCMessage {
    Query: {
        OrderID: {
            $: {
                Owner: string;
            };
            _: string;
        }[];
        Payments?: {
            Payment: Payment[];
        }[];
        OrderServicing?: {
            AcceptOffer?: {
                Offer: OrderChangeOffer[];
            }[];
        }[];
    }[];
    DataLists: {
        PassengerList: {
            Passenger: OrderPax[];
        }[];
        ContactList: {}[];
    }[];
    constructor(orderId: string, offerOwner: string);
    get nodeName(): string;
}
export {};
