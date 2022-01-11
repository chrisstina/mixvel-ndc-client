import { TicketIssueParams } from "../../request/parameters";
import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
export declare class ChangeOrderMessageMapper implements MixvelMessageMapper {
    readonly params: TicketIssueParams;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
}
