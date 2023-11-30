import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { TicketIssueParams } from "../../../core/request/parameters/TicketIssue";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
export declare class IssueOrderMessageMapper implements IMessageMapper {
    readonly params: TicketIssueParams;
    message: Mixvel_OrderChangeRQ;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
    private setPaymentDetails;
}
