import { AbstractParams } from "./AbstractParams";
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
export declare type TicketIssueProps = {
    orderId: string;
    payment: {
        amount: number;
        currency: string;
    };
    formOfPayment: {
        type: FopType;
        data?: string | Record<string, unknown>;
    };
};
export declare class TicketIssueParams extends AbstractParams {
    orderId: string;
    payment: Payment;
    formOfPayment: FormOfPayment;
    private constructor();
}
export {};
