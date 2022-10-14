import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PriceParams} from "../../../core/request/parameters/Price";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {Mixvel_ServiceListRQ, OfferRequest, OrderRequest} from "../messages/Mixvel_ServiceListRQ";

export declare class ServiceListMessageMapper implements IMessageMapper {
    readonly params: PriceParams | OrderRetrieveParams;
    constructor(params: PriceParams | OrderRetrieveParams);
    map(): Mixvel_ServiceListRQ;
    createOfferRequest(params: PriceParams): OfferRequest;
    createOrderRequest(params: OrderRetrieveParams): OrderRequest;
}
