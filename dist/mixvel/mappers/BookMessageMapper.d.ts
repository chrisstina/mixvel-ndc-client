import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { BookParams } from "../../request/parameters/Book";
import { Mixvel_OrderCreateRQ } from "../messages/Mixvel_OrderCreateRQ";
export declare class BookMessageMapper implements MixvelMessageMapper {
    readonly params: BookParams;
    constructor(params: BookParams);
    map(): Mixvel_OrderCreateRQ;
    private static passengerToPax;
    private passengerToContact;
    private firstAvailableEmail;
}
