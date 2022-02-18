import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {OrderRetrieveRQ} from "../messages/OrderRetrieveRQ";

export class OrderRetrieveMessageMapper implements IMessageMapper {
    constructor(public readonly params: OrderRetrieveParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): OrderRetrieveRQ {
        const ticketMeOfferPriceRQ = new OrderRetrieveRQ(this.params.orderId, this.params.offerOwner || '')
        ticketMeOfferPriceRQ.addParty(this.credentials)
        return ticketMeOfferPriceRQ
    }
}