import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderReshopRQ} from "../messages/Mixvel_OrderReshopRQ";
import {RefundParams} from "../../../core/request/parameters/Refund";

export class RefundInfoMessageMapper implements IMessageMapper {
    message: Mixvel_OrderReshopRQ;

    constructor(public readonly params: RefundParams) {
        this.message = new Mixvel_OrderReshopRQ(this.params.orderId);
    }

    map(): Mixvel_OrderReshopRQ {
        this.setOrderToCancel(this.params.orderItemIds)
        return this.message
    }

    private setOrderToCancel(orderItems: string[][]) {
        const uniqueOrderIds: Set<string> = new Set();
        orderItems.forEach(([orderId]) => uniqueOrderIds.add(orderId));
        this.message.UpdateOrder = {
            CancelOrder: {OrderRefID: uniqueOrderIds.values()}
        }
    }
}