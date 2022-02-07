import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_AirShoppingRQ } from "../messages/Mixvel_AirShoppingRQ";
import { SearchProps } from "../../../request/parameters/Search";
export declare class SearchMessageMapper implements IMessageMapper {
    readonly params: SearchProps;
    constructor(params: SearchProps);
    map(): Mixvel_AirShoppingRQ;
}
