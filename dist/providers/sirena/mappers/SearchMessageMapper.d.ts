import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SearchParams } from "../../../core/request/parameters/Search";
import { AirShoppingRQ } from "../messages/AirShoppingRQ";
export declare class SearchMessageMapper implements IMessageMapper {
    readonly params: SearchParams;
    readonly credentials: any;
    message: any;
    constructor(params: SearchParams, credentials: any);
    map(): AirShoppingRQ;
    private addPax;
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    private addOriginDestination;
    private setCabinPreference;
    private setDirectPreference;
}
