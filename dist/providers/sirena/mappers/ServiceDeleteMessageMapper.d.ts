import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { OrderChangeParams } from "../../../core/request/parameters/OrderChange";
import { OrderChangeRQ } from "../messages/OrderChangeRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class ServiceDeleteMessageMapper implements IMessageMapper {
    readonly params: OrderChangeParams;
    readonly credentials: PartyCredentials;
    constructor(params: OrderChangeParams, credentials: PartyCredentials);
    map(): OrderChangeRQ;
    private passengerToPax;
}
