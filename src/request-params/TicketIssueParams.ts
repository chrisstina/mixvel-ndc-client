export type FopType = "CASH" | "BILL" | "CARD"

export class TicketIssueParams {
    constructor(public readonly orderId: string,
                public readonly payment: { amount: number, currency: string },
                public readonly formOfPayment: { type: FopType, data?: string|{}}) {
    }
}