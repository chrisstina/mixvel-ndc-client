import {IRequest} from "./IRequest";
import {IConversionStrategy} from "../services/conversion/IConversionSrategy";
import {SearchParams} from "../request/parameters/Search";
import {PriceParams} from "../request/parameters/Price";
import {BookParams} from "../request/parameters/Book";
import {OrderRetrieveParams} from "../request/parameters/OrderRetrieve";
import {TicketIssueParams} from "../request/parameters/TicketIssue";
import {RefundParams} from "../request/parameters/Refund";
import {IEndpointManager} from "./IEndpointManager";
import {IRequestOptionsManager} from "./IRequestOptionsManager";

export interface IRequestManager {
    endpointManager: IEndpointManager,
    requestOptionsManager: IRequestOptionsManager
    conversionStrategy: IConversionStrategy;

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