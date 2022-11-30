import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderChangeRQ} from "../messages/Mixvel_OrderChangeRQ";
import {OrderSplitParams} from "../../../core/request/parameters/OrderSplit";

export declare class SplitOrderMessageMapper implements IMessageMapper {
    readonly params: OrderSplitParams;
    message: Mixvel_OrderChangeRQ;
    constructor(params: OrderSplitParams);
    map(): Mixvel_OrderChangeRQ;
    private setItemsToSplit;
}
