import { IRequestManager } from "../../interfaces/IRequestManager";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
import { IRequestOptionsManager } from "../../interfaces/IRequestOptionsManager";
import { IMessageMapper } from "../../interfaces/IMessageMapper";
import { GenericNDCMessage } from "../../interfaces/GenericNDCMessage";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { MixvelRequest } from "./MixvelRequest";
import { SearchParams } from "../../request/parameters/Search";
import { PriceParams } from "../../request/parameters/Price";
import { BookParams } from "../../request/parameters/Book";
import { TicketIssueParams } from "../../request/parameters/TicketIssue";
import { RefundParams } from "../../request/parameters/Refund";
import { OrderRetrieveParams } from "../../request/parameters/OrderRetrieve";
import { AbstractParamsValidator } from "../../request/AbstractParamsValidator";
export declare class MixvelEndpointManager implements IEndpointManager {
    endpoints: Map<string, string>;
    constructor(endpoints: Map<string, string>);
    getEndpointForMessage(message: GenericNDCMessage): string | never;
    getEndpointByKey(id: string): string | never;
}
export declare class MixvelRequestManager implements IRequestManager {
    readonly endpointManager: IEndpointManager;
    conversionStrategy: IConversionStrategy;
    requestOptionsManager: IRequestOptionsManager;
    constructor(endpointManager: IEndpointManager, conversionStrategy: IConversionStrategy, requestOptionsManager: IRequestOptionsManager);
    extraConfiguration: {};
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
    createRequest(requestParams: object, services: {
        mapper: IMessageMapper;
        validator?: AbstractParamsValidator;
    }): MixvelRequest;
}
