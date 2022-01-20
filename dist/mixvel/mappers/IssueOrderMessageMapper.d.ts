import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
import { TicketIssueParams } from "../../request/parameters/TicketIssue";
export declare class IssueOrderMessageMapper implements MixvelMessageMapper {
    readonly params: TicketIssueParams;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
}
