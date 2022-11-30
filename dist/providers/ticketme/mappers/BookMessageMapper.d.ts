import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {BookParams} from "../../../core/request/parameters/Book";
import {PartyCredentials} from "../TicketMeRequest";
import {OrderCreateRQ} from "../messages/OrderCreateRQ";

export declare class BookMessageMapper implements IMessageMapper {
    readonly params: BookParams;
    readonly credentials: PartyCredentials;
    message: OrderCreateRQ;
    constructor(params: BookParams, credentials: PartyCredentials);
    map(): OrderCreateRQ;
    private addPax;
    private passengerToPax;
    private passengerToContact;
}
