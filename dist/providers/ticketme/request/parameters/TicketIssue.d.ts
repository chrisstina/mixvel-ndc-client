import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {Payment, TicketIssueProps} from "../../../../core/request/parameters/TicketIssue";
import {FopType} from "../../../../core/request/types";
import {Result} from "../../../../core/Result";

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
    static create(props: TicketIssueProps): Result<TicketMeTicketIssueParams>;
    private constructor();
}
export {};
