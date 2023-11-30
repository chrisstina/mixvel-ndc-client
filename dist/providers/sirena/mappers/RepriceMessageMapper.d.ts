import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { RepriceParams } from "../../../core/request/parameters/Reprice";
import { OrderReshopRQ } from "../messages/OrderReshopRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class RepriceMessageMapper implements IMessageMapper {
    readonly params: RepriceParams;
    readonly credentials: PartyCredentials;
    constructor(params: RepriceParams, credentials: PartyCredentials);
    map(): OrderReshopRQ;
}
