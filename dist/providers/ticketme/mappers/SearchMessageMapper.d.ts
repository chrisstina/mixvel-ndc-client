import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SearchProps } from "../../../core/request/parameters/Search";
import { PartyCredentials } from "../TicketMeRequest";
import { AirShoppingRQ } from "../messages/AirShoppingRQ";
export declare class SearchMessageMapper implements IMessageMapper {
    readonly params: SearchProps;
    readonly credentials: PartyCredentials;
    constructor(params: SearchProps, credentials: PartyCredentials);
    map(): AirShoppingRQ;
}
