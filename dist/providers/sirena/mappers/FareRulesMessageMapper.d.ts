import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { SirenaPriceParams } from "../request/parameters/Price";
import { FareRulesRQ } from "../messages/FareRulesRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class FareRulesMessageMapper implements IMessageMapper {
    readonly params: SirenaPriceParams | OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    constructor(params: SirenaPriceParams | OrderRetrieveParams, credentials: PartyCredentials);
    map(): FareRulesRQ;
}
