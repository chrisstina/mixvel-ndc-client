import { IRequest } from "../../interfaces/IRequest";
import { IRequestManager } from "../../interfaces/IRequestManager";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
import { IRequestOptionsManager } from "../../interfaces/IRequestOptionsManager";
import { IMessageMapper } from "../../interfaces/IMessageMapper";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { Result } from "../../core/Result";
import { SearchParams } from "../../core/request/parameters/Search";
import { PriceParams } from "../../core/request/parameters/Price";
import { BookParams } from "../../core/request/parameters/Book";
import { TicketIssueParams } from "../../core/request/parameters/TicketIssue";
import { RefundParams } from "../../core/request/parameters/Refund";
import { OrderRetrieveParams } from "../../core/request/parameters/OrderRetrieve";
import { RepriceParams } from "../../core/request/parameters/Reprice";
import { OrderSplitParams } from "../../core/request/parameters/OrderSplit";
import { OrderChangeParams } from "../../core/request/parameters/OrderChange";
import { AirlineProfileParams } from "../../core/request/parameters/AirlineProfile";
export declare class MixvelRequestManager implements IRequestManager {
    readonly endpointManager: IEndpointManager;
    conversionStrategy: IConversionStrategy;
    requestOptionsManager: IRequestOptionsManager;
    extraConfiguration: {};
    constructor(endpointManager: IEndpointManager, conversionStrategy: IConversionStrategy, requestOptionsManager: IRequestOptionsManager);
    private static prepareBookParams;
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): Result<IRequest>;
    createSearchRequest(params: SearchParams): Result<IRequest>;
    createPriceRequest(params: PriceParams): Result<IRequest>;
    createRepriceRequest(params: RepriceParams): Result<IRequest>;
    createBookRequest(params: BookParams): Result<IRequest>;
    createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest>;
    createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest>;
    createTicketIssueRequest(params: TicketIssueParams): Result<IRequest>;
    createRefundCalculationRequest(params: RefundParams): Result<IRequest>;
    createRefundRequest(params: RefundParams): Result<IRequest>;
    createFareRulesRequest(params: PriceParams | OrderRetrieveParams): Result<IRequest>;
    createServiceListRequest(params: PriceParams | OrderRetrieveParams): Result<IRequest>;
    createServiceAddRequest(params: OrderChangeParams): Result<IRequest>;
    createOrderSplitRequest(params: OrderSplitParams): Result<IRequest>;
    createAirlineProfileRequest(value: AirlineProfileParams): Result<IRequest>;
    createRequest(requestParams: object, services: {
        mapper: IMessageMapper;
    }): IRequest;
}
