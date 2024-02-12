import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { AirlineProfileParams } from "../../../core/request/parameters/AirlineProfile";
import { AirlineProfileRQ } from "../messages/AirlineProfileRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class AirlineProfileMessageMapper implements IMessageMapper {
    readonly params: AirlineProfileParams;
    readonly credentials: PartyCredentials;
    message: AirlineProfileRQ;
    constructor(params: AirlineProfileParams, credentials: PartyCredentials);
    map(): AirlineProfileRQ;
}
