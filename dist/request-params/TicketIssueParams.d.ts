export declare type FopType = "CASH" | "BILL" | "CARD";
export declare class TicketIssueParams {
    readonly orderId: string;
    readonly payment: {
        amount: number;
        currency: string;
    };
    readonly formOfPayment: {
        type: FopType;
        data?: string | {};
    };
    constructor(orderId: string, payment: {
        amount: number;
        currency: string;
    }, formOfPayment: {
        type: FopType;
        data?: string | {};
    });
}
