import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Mixvel_OrderReshopRQ} from "../messages/Mixvel_OrderReshopRQ";
import {RefundParams} from "../../../core/request/parameters/Refund";

export declare class RefundInfoMessageMapper implements IMessageMapper {
    readonly params: RefundParams;
    message: Mixvel_OrderReshopRQ;
    constructor(params: RefundParams);
    map(): Mixvel_OrderReshopRQ;
    private setOrderToCancel;
}
