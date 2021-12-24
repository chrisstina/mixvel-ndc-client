import { SearchParams } from "../../request-params/SearchParams";
import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_AirShoppingRQ } from "../request/Mixvel_AirShoppingRQ";
export declare class SearchMessageMapper implements MixvelMessageMapper {
    readonly params: SearchParams;
    constructor(params: SearchParams);
    map(): Mixvel_AirShoppingRQ;
}
