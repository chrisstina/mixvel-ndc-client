import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PriceParams } from "../../../core/request/parameters/Price";
import { ServiceListRQ } from "../messages/ServiceListRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class ServiceListMessageMapper implements IMessageMapper {
    readonly params: PriceParams;
    readonly credentials: PartyCredentials;
    message: ServiceListRQ;
    constructor(params: PriceParams, credentials: PartyCredentials);
    map(): ServiceListRQ;
    createOfferRequest(params: PriceParams): ServiceListRQ;
}
