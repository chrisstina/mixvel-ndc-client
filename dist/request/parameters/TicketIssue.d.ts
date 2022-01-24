import { Result } from "../../core/Result";
import { FopType } from "../types";
declare class FormOfPayment {
    type: FopType;
    data?: string | {};
    constructor(type: FopType, data?: string | {});
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
        data?: string | {};
    };
};
export declare class TicketIssueParams {
    orderId: string;
    payment: Payment;
    formOfPayment: FormOfPayment;
    private constructor();
    static create(props: TicketIssueProps): Result<TicketIssueParams>;
}
export {};