import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SirenaTicketIssueParams } from "../request/parameters/TicketIssue";
import { OrderChangeRQ } from "../messages/OrderChangeRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class IssueTicketMessageMapper implements IMessageMapper {
    readonly params: SirenaTicketIssueParams;
    readonly credentials: PartyCredentials;
    message: OrderChangeRQ;
    constructor(params: SirenaTicketIssueParams, credentials: PartyCredentials);
    map(): OrderChangeRQ;
    private setPaymentDetails;
}
