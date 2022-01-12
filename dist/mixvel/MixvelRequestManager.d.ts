import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
import { BookParams, OrderRetrieveParams, PriceParams, SearchParams, TicketIssueParams } from "../request/parameters";
import { MixvelRequest, MixvelRequestOptions } from "./MixvelRequest";
import { AbstractParamsValidator } from "../request/validators/AbstractParamsValidator";
import { MixvelMessageMapper } from "./mappers/MixvelMessageMapper";
import { GenericNDCMessage } from "./messages/GenericNDCMessage";
export declare class MixvelRequestOptionsManager {
    static create(params: {
        endpoint: string;
        method?: "GET" | "POST";
        headers?: {};
    }): MixvelRequestOptions;
}
export declare class MixvelEndpointManager {
    endpoints: any;
    getEndpointForMessage(message: GenericNDCMessage): string | never;
    getEndpointByKey(id: string): string | never;
}
export declare class MixvelRequestManager {
    conversionStrategy: IConversionStrategy;
    endpointManager: MixvelEndpointManager;
    constructor(conversionStrategy: IConversionStrategy);
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): MixvelRequest;
    createSearchRequest(params: SearchParams): MixvelRequest;
    createPriceRequest(params: PriceParams): MixvelRequest;
    createBookRequest(params: BookParams): MixvelRequest;
    createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
    createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
    createTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
    protected createRequest(requestParams: object, services: {
        mapper: MixvelMessageMapper;
        validator?: typeof AbstractParamsValidator;
    }): MixvelRequest;
}
