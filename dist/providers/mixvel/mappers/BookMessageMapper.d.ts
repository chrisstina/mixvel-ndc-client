import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_OrderCreateRQ } from "../messages/Mixvel_OrderCreateRQ";
import { MixvelBookParams } from "../request/parameters/Book";
export declare class BookMessageMapper implements IMessageMapper {
    readonly params: MixvelBookParams;
    constructor(params: MixvelBookParams);
    private static passengerToPax;
    private static passengerToContact;
    map(): Mixvel_OrderCreateRQ;
}
