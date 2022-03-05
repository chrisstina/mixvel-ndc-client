import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {OrderReshopRQ} from "../messages/OrderReshopRQ";

export class RepriceMessageMapper implements IMessageMapper {
    constructor(public readonly params: OrderRetrieveParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): OrderReshopRQ {
        const ticketMeReshopRQ = new OrderReshopRQ(this.params.orderId)
        ticketMeReshopRQ.addParty(this.credentials)
        return ticketMeReshopRQ
    }
}