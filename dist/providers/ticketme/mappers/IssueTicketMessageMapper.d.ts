import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {AirDocIssueRQ} from "../messages/AirDocIssueRQ";
import {TicketIssueParams} from "../../../core/request/parameters/TicketIssue";
import {PartyCredentials} from "../TicketMeRequest";

export declare class IssueTicketMessageMapper implements IMessageMapper {
    readonly params: TicketIssueParams;
    readonly credentials: PartyCredentials;
    message: AirDocIssueRQ;
    constructor(params: TicketIssueParams, credentials: PartyCredentials);
    map(): AirDocIssueRQ;
    private setPaymentDetails;
}
