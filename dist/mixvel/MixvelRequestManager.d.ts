import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
import { MixvelRequest, MixvelRequestOptions } from "./MixvelRequest";
import { SearchParams } from "../request/parameters/Search";
import { PriceParams } from "../request/parameters/Price";
import { BookParams } from "../request/parameters/Book";
import { TicketIssueParams } from "../request/parameters/TicketIssue";
import { RefundParams } from "../request/parameters/Refund";
import { OrderRetrieveParams } from "../request/parameters/OrderRetrieve";
import { AbstractParamsValidator } from "./validators/AbstractParamsValidator";
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
    endpoints: Map<string, string>;
    constructor(endpoints: Map<string, string>);
    getEndpointForMessage(message: GenericNDCMessage): string | never;
    getEndpointByKey(id: string): string | never;
}
export declare class MixvelRequestManager {
    readonly endpointManager: MixvelEndpointManager;
    conversionStrategy: IConversionStrategy;
    constructor(endpointManager: MixvelEndpointManager, conversionStrategy: IConversionStrategy);
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): MixvelRequest;
    createSearchRequest(params: SearchParams): MixvelRequest;
    createPriceRequest(params: PriceParams): MixvelRequest;
    createFareRulesRequest(params: PriceParams): MixvelRequest;
    createBookRequest(params: BookParams): MixvelRequest;
    createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
    createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
    createTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
    createRefundCalculationRequest(params: OrderRetrieveParams): MixvelRequest;
    createRefundRequest(params: RefundParams): MixvelRequest;
    createServiceListRequest(params: PriceParams): MixvelRequest;
    protected createRequest(requestParams: object, services: {
        mapper: MixvelMessageMapper;
        validator?: AbstractParamsValidator;
    }): MixvelRequest;
}
