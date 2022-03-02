import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { FopType } from "../types";
declare class FormOfPayment {
    type: FopType;
    data?: string | Record<string, unknown>;
    constructor(type: FopType, data?: string | Record<string, unknown>);
}
declare class Payment {
    amount: number;
    currency: string;
    constructor(amount: number, currency: string);
}
export declare type TicketIssueProps = RequestProps<TicketIssueParams>;
export declare class TicketIssueParams extends AbstractRequestParams {
    orderId: string;
    payment: Payment;
    formOfPayment: FormOfPayment;
    private constructor();
}
export {};
