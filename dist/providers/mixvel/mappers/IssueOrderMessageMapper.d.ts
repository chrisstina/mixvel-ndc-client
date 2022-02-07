import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
import { TicketIssueParams } from "../../../request/parameters/TicketIssue";
export declare class IssueOrderMessageMapper implements IMessageMapper {
    readonly params: TicketIssueParams;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
}
