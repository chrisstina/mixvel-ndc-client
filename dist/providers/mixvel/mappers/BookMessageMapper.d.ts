import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { BookParams } from "../../../request/parameters/Book";
import { Mixvel_OrderCreateRQ } from "../messages/Mixvel_OrderCreateRQ";
export declare class BookMessageMapper implements IMessageMapper {
    readonly params: BookParams;
    constructor(params: BookParams);
    map(): Mixvel_OrderCreateRQ;
    private static passengerToPax;
    private passengerToContact;
    private firstAvailableEmail;
}
