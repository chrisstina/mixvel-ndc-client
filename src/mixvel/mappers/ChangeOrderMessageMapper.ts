import assert from "assert";

import {MixvelMessageMapper} from "./MixvelMessageMapper";
import {DirectBill, Mixvel_OrderChangeRQ, OtherPaymentMethod} from "../request/Mixvel_OrderChangeRQ";
import {FopType, TicketIssueParams} from "../../request-params/TicketIssueParams";


export class ChangeOrderMessageMapper implements MixvelMessageMapper {
    constructor(public readonly params: TicketIssueParams) {
    }

    map(): Mixvel_OrderChangeRQ {
        return new Mixvel_OrderChangeRQ(this.params.orderId,
            {amount: this.params.payment.amount.toString(), currency: this.params.payment.currency},
            createFOP(this.params.formOfPayment)
        )
    }
}

function createFOP({type, data}: { type: FopType, data?: string | {} }): OtherPaymentMethod | DirectBill {
    switch (type) {
        case "BILL":
            assert(typeof data === "string", "Data for BILL FOR must be string")
            return new DirectBill(data)
        case "CASH":
            return new OtherPaymentMethod()
        case "CARD":
            throw new Error(`CARD FOP not implemented yet`)
        default:
            throw new Error(`Invalid FOP ${type} given. "BILL" or "CASH" expected`)
    }
}