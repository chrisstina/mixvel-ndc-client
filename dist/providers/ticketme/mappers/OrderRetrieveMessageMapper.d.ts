import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../TicketMeRequest";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderRetrieveRQ } from "../messages/OrderRetrieveRQ";
export declare class OrderRetrieveMessageMapper implements IMessageMapper {
    readonly params: OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    message: OrderRetrieveRQ;
    constructor(params: OrderRetrieveParams, credentials: PartyCredentials);
    map(): OrderRetrieveRQ;
}
