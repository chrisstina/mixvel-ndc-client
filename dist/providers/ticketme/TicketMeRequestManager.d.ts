import {Result} from "../../core/Result";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {IRequest} from "../../interfaces/IRequest";
import {IRequestManager} from "../../interfaces/IRequestManager";
import {IMessageMapper} from "../../interfaces/IMessageMapper";
import {IEndpointManager} from "../../interfaces/IEndpointManager";
import {IRequestOptionsManager} from "../../interfaces/IRequestOptionsManager";
import {AbstractRequestParams} from "../../core/request/parameters/AbstractRequestParams";
import {BookParams} from "../../core/request/parameters/Book";
import {PriceParams} from "../../core/request/parameters/Price";
import {OrderRetrieveParams} from "../../core/request/parameters/OrderRetrieve";
import {RefundParams} from "../../core/request/parameters/Refund";
import {SearchParams} from "../../core/request/parameters/Search";
import {TicketIssueParams} from "../../core/request/parameters/TicketIssue";
import {RepriceParams} from "../../core/request/parameters/Reprice";
import {OrderSplitParams} from "../../core/request/parameters/OrderSplit";

export declare class TicketMeRequestManager implements IRequestManager {
    readonly endpointManager: IEndpointManager;
    readonly conversionStrategy: IConversionStrategy;
    readonly requestOptionsManager: IRequestOptionsManager;
    extraConfiguration: {
        party: {
            agencyId: string;
        };
        currency: string;
        lang: string;
    };
    constructor(endpointManager: IEndpointManager, conversionStrategy: IConversionStrategy, requestOptionsManager: IRequestOptionsManager);
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): Result<IRequest>;
    createBookRequest(params: BookParams): Result<IRequest>;
    createFareRulesRequest(params: PriceParams): Result<IRequest>;
    createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest>;
    createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest>;
    createPriceRequest(params: PriceParams): Result<IRequest>;
    createRefundCalculationRequest(params: OrderRetrieveParams): Result<IRequest>;
    createRefundRequest(params: RefundParams): Result<IRequest>;
    createSearchRequest(params: SearchParams): Result<IRequest>;
    createServiceListRequest(params: PriceParams): Result<IRequest>;
    createTicketIssueRequest(params: TicketIssueParams): Result<IRequest>;
    createRepriceRequest(params: RepriceParams): Result<IRequest>;
    createOrderSplitRequest(params: OrderSplitParams): Result<IRequest>;
    validateRequest(): string | null;
    createRequest(requestParams: AbstractRequestParams, services: {
        mapper: IMessageMapper;
    }): Result<IRequest>;
}
