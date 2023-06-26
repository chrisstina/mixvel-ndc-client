import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PriceParams } from "../../../core/request/parameters/Price";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { Passenger } from "../../ticketme/messages/OfferPriceRQ";
import { OfferRequest, OrderRequest, ServiceListRQ } from "../messages/ServiceListRQ";
import { PartyCredentials } from "../SirenaRequest";
export declare class ServiceListMessageMapper implements IMessageMapper {
    readonly params: PriceParams | OrderRetrieveParams;
    readonly credentials: PartyCredentials;
    constructor(params: PriceParams | OrderRetrieveParams, credentials: PartyCredentials);
    map(): ServiceListRQ;
    createOfferRequest(params: PriceParams): OfferRequest;
    createPaxDataList(params: PriceParams): {
        PassengerList: {
            Passenger: Passenger[];
        };
    };
    createOrderRequest(params: OrderRetrieveParams): OrderRequest;
}
