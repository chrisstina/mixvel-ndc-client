import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { Mixvel_OrderCreateRQ } from "../messages/Mixvel_OrderCreateRQ";
import { MixvelBookParams } from "../request/parameters/Book";
export declare class BookMessageMapper implements IMessageMapper {
    readonly params: MixvelBookParams;
    message: Mixvel_OrderCreateRQ;
    constructor(params: MixvelBookParams);
    map(): Mixvel_OrderCreateRQ;
    private passengerToPax;
    private passengerToContact;
    private addPax;
    /**
     * @param {Offer} offer
     * @return {SelectedOffer}
     */
    private addSelectedOffer;
    /**
     * @param {SelectedOffer} selectedOffer
     * @param {string} offerItemId
     * @param {string[]} paxRefs
     */
    private addSelectedOfferItem;
    private addRemarks;
    private addLoyaltyPrograms;
    private setPaymentDetails;
}
