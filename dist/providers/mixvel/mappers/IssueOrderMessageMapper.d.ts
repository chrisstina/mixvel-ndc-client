import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_OrderChangeRQ } from "../messages/Mixvel_OrderChangeRQ";
import { TicketIssueParams } from "../../../core/request/parameters/TicketIssue";
export declare class IssueOrderMessageMapper implements IMessageMapper {
    readonly params: TicketIssueParams;
    message: Mixvel_OrderChangeRQ;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
    private setPaymentDetails;
}
