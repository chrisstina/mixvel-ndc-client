import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SearchParams } from "../../../core/request/parameters/Search";
import { PartyCredentials } from "../TicketMeRequest";
import { AirShoppingRQ } from "../messages/AirShoppingRQ";
export declare class SearchMessageMapper implements IMessageMapper {
    readonly params: SearchParams;
    readonly credentials: PartyCredentials;
    constructor(params: SearchParams, credentials: PartyCredentials);
    map(): AirShoppingRQ;
}
