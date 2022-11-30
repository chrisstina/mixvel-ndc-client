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
        this.message.UpdateOrder = {
            CancelOrder: {OrderRefID: orderItems.map(([orderId]) => orderId)}
        }
    }
}