import assert from "assert";

import {FopType} from "../../../core/request/types";

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {DirectBill, Mixvel_OrderChangeRQ, OtherPaymentMethod} from "../messages/Mixvel_OrderChangeRQ";
import {TicketIssueParams} from "../../../core/request/parameters/TicketIssue";

export class IssueOrderMessageMapper implements IMessageMapper {
    constructor(public readonly params: TicketIssueParams) {
    }

    map(): Mixvel_OrderChangeRQ {
        const rq = new Mixvel_OrderChangeRQ(this.params.orderId)
        rq.setPaymentDetails({amount: this.params.payment.amount.toString(), currency: this.params.payment.currency},
            createFOP(this.params.formOfPayment))
        return rq
    }
}

function createFOP({type, data}: { type: FopType, data?: string | {} }): OtherPaymentMethod | DirectBill {
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