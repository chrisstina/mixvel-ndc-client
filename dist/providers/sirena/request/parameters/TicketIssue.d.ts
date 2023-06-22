import { Result } from "../../../../core/Result";
import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { Payment, TicketIssueProps } from "../../../../core/request/parameters/TicketIssue";
import { FopType } from "../../../../core/request/types";
declare class SirenaFormOfPayment {
    type: FopType;
    data?: string | Record<string, unknown>;
    constructor(type: FopType, data?: string | Record<string, unknown>);
}
export declare class SirenaTicketIssueParams extends AbstractRequestParams {
    orderId: string;
    orderOwner: string;
    payment: Payment;
    formOfPayment: SirenaFormOfPayment;
    private constructor();
    static create(props: TicketIssueProps): Result<SirenaTicketIssueParams>;
}
export {};
