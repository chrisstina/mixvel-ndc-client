import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { BookParams } from "../../../core/request/parameters/Book";
import { OrderCreateRQ } from "../messages/OrderCreateRQ";
export declare class BookMessageMapper implements IMessageMapper {
    readonly params: BookParams;
    constructor(params: BookParams);
    private static passengerToPax;
    private static passengerToContact;
    map(): OrderCreateRQ;
}
