import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderChangeRQ} from "../messages/Mixvel_OrderChangeRQ";
import {RefundParams} from "../../../core/request/parameters/Refund";

export class RefundOrderMessageMapper implements IMessageMapper {
    message: Mixvel_OrderChangeRQ;

    constructor(public readonly params: RefundParams) {
        this.message = new Mixvel_OrderChangeRQ(this.params.orderId)
    }

    map(): Mixvel_OrderChangeRQ {
        this.setItemsToDelete(this.params.orderItemIds)
        return this.message
    }

    private setItemsToDelete(orderItems: string[][]) {
        this.message.ChangeOrder = {
            UpdateOrderItem: {
                DeleteOrderItemList: orderItems.map(([orderId, orderItemId]) => {
                    return {
                        DeleteOrderItem: {
                            OrderID: orderId,
                            OrderItemID: orderItemId
                        }
                    }
                })
            }
        }
    }
}