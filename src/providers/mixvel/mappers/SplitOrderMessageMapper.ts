import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderChangeRQ} from "../messages/Mixvel_OrderChangeRQ";
import {OrderSplitParams, SplitOrderItem} from "../../../core/request/parameters/OrderSplit";

export class SplitOrderMessageMapper implements IMessageMapper {
    message: Mixvel_OrderChangeRQ;

    constructor(public readonly params: OrderSplitParams) {
        this.message = new Mixvel_OrderChangeRQ()
    }

    map(): Mixvel_OrderChangeRQ {
        this.setItemsToSplit(this.params.splitOrderItems)
        this.message.setMixOrder(this.params.orderId);
        return this.message
    }

    private setItemsToSplit(orderItems: SplitOrderItem[]) {
        this.message.ChangeOrder = {
            SplitOrder: orderItems.map(({orderItemId, paxRefs}) => {
                return {
                    OrderID: orderItemId,
                    PaxRefID: paxRefs
                }
            })
        }
    }
}