import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../TicketMeRequest";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderCancelRQ } from "../messages/OrderCancelRQ";
export declare class OrderCancelMessageMapper implements IMessageMapper {
    readonly params: OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    constructor(params: OrderRetrieveParams, credentials: PartyCredentials);
    map(): OrderCancelRQ;
}
