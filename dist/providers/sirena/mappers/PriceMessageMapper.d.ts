import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PriceParams } from "../../../core/request/parameters/Price";
import { OfferPriceRQ } from "../../ticketme/messages/OfferPriceRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class PriceMessageMapper implements IMessageMapper {
    readonly params: PriceParams;
    readonly credentials: PartyCredentials;
    message: OfferPriceRQ;
    constructor(params: PriceParams, credentials: PartyCredentials);
    map(): OfferPriceRQ;
}
