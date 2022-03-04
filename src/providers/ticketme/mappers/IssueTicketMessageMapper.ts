import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {AirDocIssueRQ} from "../messages/AirDocIssueRQ";
import {TicketIssueParams} from "../../../core/request/parameters/TicketIssue";
import {toTicketMeMethod, toTicketMeType} from "./dictionary/fop";
import {PartyCredentials} from "../TicketMeRequest";

export class IssueTicketMessageMapper implements IMessageMapper {
    constructor(public readonly params: TicketIssueParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): AirDocIssueRQ {
        const rq = new AirDocIssueRQ(this.params.paxs || [])
        rq.setPaymentDetails(this.params.orderId,
            this.params.orderOwner || '',
            {amount: this.params.payment.amount.toString(), currency: this.params.payment.currency},
            {
                fopType: toTicketMeType(this.params.formOfPayment.type),
                fopMethod: toTicketMeMethod(this.params.formOfPayment.type)
            })
        rq.addParty(this.credentials)
        return rq;
    }
}