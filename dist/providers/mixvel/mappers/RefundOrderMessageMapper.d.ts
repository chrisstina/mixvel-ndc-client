import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
import { RefundParams } from "../../../core/request/parameters/Refund";
export declare class RefundOrderMessageMapper implements IMessageMapper {
    readonly params: RefundParams;
    message: Mixvel_OrderChangeRQ;
    constructor(params: RefundParams);
    map(): Mixvel_OrderChangeRQ;
    private setItemsToDelete;
}
