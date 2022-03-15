import assert from "assert";

import {FopType} from "../../../core/request/types";

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {DirectBill, Mixvel_OrderChangeRQ, OtherPaymentMethod} from "../messages/Mixvel_OrderChangeRQ";
import {TicketIssueParams} from "../../../core/request/parameters/TicketIssue";

export class IssueOrderMessageMapper implements IMessageMapper {
    message: Mixvel_OrderChangeRQ;

    constructor(public readonly params: TicketIssueParams) {
        this.message = new Mixvel_OrderChangeRQ(this.params.orderId)
    }

    map(): Mixvel_OrderChangeRQ {
        this.setPaymentDetails(
            {amount: this.params.payment.amount.toString(), currency: this.params.payment.currency},
            createFOP(this.params.formOfPayment))
        return this.message
    }

    private setPaymentDetails({
                                  amount,
                                  currency
                              }: { amount: string, currency: string }, fop: OtherPaymentMethod | DirectBill) {
        this.message.PaymentFunctions = {
            "PaymentProcessingDetails": {
                "Amount": {"_": amount, "$": {"CurCode": currency}},
                "PaymentProcessingDetailsPaymentMethod": fop
            }
        }
    }
}

function createFOP({
                       type,
                       data
                   }: { type: FopType, data?: string | Record<string, unknown> }): OtherPaymentMethod | DirectBill {
    switch (type) {
        case "BILL":
            assert(typeof data === "string", "Data for BILL FOR must be string") // @todo move to validation
            return new DirectBill(data)
        case "CASH":
            return new OtherPaymentMethod()
        case "CARD":
            throw new Error(`CARD FOP not implemented yet`)
        default:
            throw new Error(`Invalid FOP ${type} given. "BILL" or "CASH" expected`)
    }
}