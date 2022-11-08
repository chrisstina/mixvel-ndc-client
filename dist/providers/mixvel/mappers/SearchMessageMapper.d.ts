import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {SearchProps} from "../../../core/request/parameters/Search";
import {Mixvel_AirShoppingRQ} from "../messages/Mixvel_AirShoppingRQ";

export declare class SearchMessageMapper implements IMessageMapper {
    readonly params: SearchProps;
    constructor(params: SearchProps);
    map(): Mixvel_AirShoppingRQ;
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {MixvelCabin} cabinTypeCode
     * @return {OriginDestination}
     */
    private createOD;
    private addCarrierCriteria;
    private addConnectionCriteria;
    private addFlightCriteria;
    private addPricingCriteria;
    private addProgramCriteria;
    private generateConnectionId;
    private generateCarrierPrefId;
}
