import {Result} from "../core/Result";
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
import {RepriceParams} from "../core/request/parameters/Reprice";

export interface IRequestManager {
    endpointManager: IEndpointManager,
    requestOptionsManager: IRequestOptionsManager
    conversionStrategy: IConversionStrategy;

    // Party data, agency id, lang, currency etc,
    extraConfiguration: Record<string, unknown>

    createAuthRequest(params: { login: string, password: string, structureId: string }): Result<IRequest>;

    createSearchRequest(params: SearchParams): Result<IRequest>;

    createPriceRequest(params: PriceParams): Result<IRequest>;

    createRepriceRequest(params: RepriceParams): Result<IRequest>;

    createFareRulesRequest(params: PriceParams): Result<IRequest>;

    createBookRequest(params: BookParams): Result<IRequest>;

    createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest>;

    createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest>;

    createTicketIssueRequest(params: TicketIssueParams): Result<IRequest>;

    createRefundCalculationRequest(params: OrderRetrieveParams): Result<IRequest>;

    createRefundRequest(params: RefundParams): Result<IRequest>;

    createServiceListRequest(params: PriceParams): Result<IRequest>;
}