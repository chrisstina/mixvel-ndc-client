import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { IRequestManager } from "../../interfaces/IRequestManager";
import { IMessageMapper } from "../../interfaces/IMessageMapper";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
import { IRequestOptionsManager } from "../../interfaces/IRequestOptionsManager";
import { BookParams } from "../../request/parameters/Book";
import { PriceParams } from "../../request/parameters/Price";
import { OrderRetrieveParams } from "../../request/parameters/OrderRetrieve";
import { RefundParams } from "../../request/parameters/Refund";
import { IRequest } from "../../interfaces/IRequest";
import { SearchParams } from "../../request/parameters/Search";
import { TicketIssueParams } from "../../request/parameters/TicketIssue";
import { AbstractParamsValidator } from "../../request/AbstractParamsValidator";
import { TicketMeRequest } from "./TicketMeRequest";
export declare class TicketMeRequestManager implements IRequestManager {
    readonly endpointManager: IEndpointManager;
    readonly conversionStrategy: IConversionStrategy;
    readonly requestOptionsManager: IRequestOptionsManager;
    constructor(endpointManager: IEndpointManager, conversionStrategy: IConversionStrategy, requestOptionsManager: IRequestOptionsManager);
    extraConfiguration: {
        party: {
            agencyId: string;
        };
        currency: string;
        lang: string;
    };
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): IRequest;
    createBookRequest(params: BookParams): IRequest;
    createFareRulesRequest(params: PriceParams): IRequest;
    createOrderCancelRequest(params: OrderRetrieveParams): IRequest;
    createOrderRetrieveRequest(params: OrderRetrieveParams): IRequest;
    createPriceRequest(params: PriceParams): IRequest;
    createRefundCalculationRequest(params: OrderRetrieveParams): IRequest;
    createRefundRequest(params: RefundParams): IRequest;
    createSearchRequest(params: SearchParams): IRequest;
    createServiceListRequest(params: PriceParams): IRequest;
    createTicketIssueRequest(params: TicketIssueParams): IRequest;
    createRequest(requestParams: object, services: {
        mapper: IMessageMapper;
        validator?: AbstractParamsValidator;
    }): TicketMeRequest;
}
