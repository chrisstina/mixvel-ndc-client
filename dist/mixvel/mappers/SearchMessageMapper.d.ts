import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_AirShoppingRQ } from "../messages/Mixvel_AirShoppingRQ";
import { SearchProps } from "../../request/parameters/Search";
export declare class SearchMessageMapper implements MixvelMessageMapper {
    readonly params: SearchProps;
    constructor(params: SearchProps);
    map(): Mixvel_AirShoppingRQ;
}
