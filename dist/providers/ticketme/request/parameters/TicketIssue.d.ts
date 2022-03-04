import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { Payment } from "../../../../core/request/parameters/TicketIssue";
import { FopType } from "../../../../core/request/types";
declare class TicketMeFormOfPayment {
    type: FopType;
    data?: string | Record<string, unknown>;
    constructor(type: FopType, data?: string | Record<string, unknown>);
}
export declare class TicketMeTicketIssueParams extends AbstractRequestParams {
    orderId: string;
    orderOwner?: string;
    payment: Payment;
    formOfPayment: TicketMeFormOfPayment;
    paxs?: string[];
    private constructor();
}
export {};
