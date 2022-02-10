import {IRequest} from "./IRequest";
import {IConversionStrategy} from "../services/conversion/IConversionSrategy";
import {SearchParams} from "../core/request/parameters/Search";
import {PriceParams} from "../core/request/parameters/Price";
import {BookParams} from "../core/request/parameters/Book";
import {OrderRetrieveParams} from "../core/request/parameters/OrderRetrieve";
import {TicketIssueParams} from "../core/request/parameters/TicketIssue";
import {RefundParams} from "../core/request/parameters/Refund";
import {IEndpointManager} from "./IEndpointManager";
import {IRequestOptionsManager} from "./IRequestOptionsManager";

export interface IRequestManager {
    endpointManager: IEndpointManager,
    requestOptionsManager: IRequestOptionsManager
    conversionStrategy: IConversionStrategy;

    // Party data, agency id, lang, currency etc,
    extraConfiguration: Record<string, unknown>

    createAuthRequest(params: { login: string, password: string, structureId: string }): IRequest;

    createSearchRequest(params: SearchParams): IRequest;

    createPriceRequest(params: PriceParams): IRequest;

    createFareRulesRequest(params: PriceParams): IRequest;

    createBookRequest(params: BookParams): IRequest;

    createOrderRetrieveRequest(params: OrderRetrieveParams): IRequest;

    createOrderCancelRequest(params: OrderRetrieveParams): IRequest;

    createTicketIssueRequest(params: TicketIssueParams): IRequest;

    createRefundCalculationRequest(params: OrderRetrieveParams): IRequest;

    createRefundRequest(params: RefundParams): IRequest;

    createServiceListRequest(params: PriceParams): IRequest;
}