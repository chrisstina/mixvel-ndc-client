import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { OrderCancelRQ } from "../messages/OrderCancelRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class OrderCancelMessageMapper implements IMessageMapper {
    readonly params: OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    message: OrderCancelRQ;
    constructor(params: OrderRetrieveParams, credentials: PartyCredentials);
    map(): OrderCancelRQ;
}
