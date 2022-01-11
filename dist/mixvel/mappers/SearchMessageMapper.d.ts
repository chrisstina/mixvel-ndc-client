import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { SearchParams } from "../../request/parameters";
import { Mixvel_AirShoppingRQ } from "../messages/Mixvel_AirShoppingRQ";
export declare class SearchMessageMapper implements MixvelMessageMapper {
    readonly params: SearchParams;
    constructor(params: SearchParams);
    map(): Mixvel_AirShoppingRQ;
}
