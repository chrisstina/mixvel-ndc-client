
import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderChangeRQ} from "../messages/Mixvel_OrderChangeRQ";
import {RefundParams} from "../../../request/parameters/Refund";

export class RefundOrderMessageMapper implements IMessageMapper {
    constructor(public readonly params: RefundParams) {
    }

    map(): Mixvel_OrderChangeRQ {
        const rq = new Mixvel_OrderChangeRQ(this.params.orderId)
        rq.setItemsToDelete(this.params.orderItemIds)
        return rq
    }
}