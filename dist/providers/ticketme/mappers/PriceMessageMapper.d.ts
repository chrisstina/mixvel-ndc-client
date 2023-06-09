import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PartyCredentials } from "../TicketMeRequest";
import { PriceParams } from "../../../core/request/parameters/Price";
import { OfferPriceRQ } from "../messages/OfferPriceRQ";
export declare class PriceMessageMapper implements IMessageMapper {
    readonly params: PriceParams;
    readonly credentials: PartyCredentials;
    message: OfferPriceRQ;
    constructor(params: PriceParams, credentials: PartyCredentials);
    map(): OfferPriceRQ;
}
