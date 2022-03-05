import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {OrderCancelRQ} from "../messages/OrderCancelRQ";

export class OrderCancelMessageMapper implements IMessageMapper {
    constructor(public readonly params: OrderRetrieveParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): OrderCancelRQ {
        const ticketMeOrderCancelRQ = new OrderCancelRQ(this.params.orderId, this.params.offerOwner || '')
        ticketMeOrderCancelRQ.addParty(this.credentials)
        return ticketMeOrderCancelRQ
    }
}