import { RefundParams } from "../../request/parameters";
import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
export declare class RefundOrderMessageMapper implements MixvelMessageMapper {
    readonly params: RefundParams;
    constructor(params: RefundParams);
    map(): Mixvel_OrderChangeRQ;
}
