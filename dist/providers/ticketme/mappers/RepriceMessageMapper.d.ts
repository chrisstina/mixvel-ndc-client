import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../TicketMeRequest";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderReshopRQ } from "../messages/OrderReshopRQ";
export declare class RepriceMessageMapper implements IMessageMapper {
    readonly params: OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    message: OrderReshopRQ;
    constructor(params: OrderRetrieveParams, credentials: PartyCredentials);
    map(): OrderReshopRQ;
}
