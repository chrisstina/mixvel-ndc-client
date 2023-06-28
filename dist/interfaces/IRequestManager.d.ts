import { Result } from "../core/Result";
import { IRequest } from "./IRequest";
import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
import { SearchParams } from "../core/request/parameters/Search";
import { PriceParams } from "../core/request/parameters/Price";
import { BookParams } from "../core/request/parameters/Book";
import { OrderRetrieveParams } from "../core/request/parameters/OrderRetrieve";
import { TicketIssueParams } from "../core/request/parameters/TicketIssue";
import { RefundParams } from "../core/request/parameters/Refund";
import { IEndpointManager } from "./IEndpointManager";
import { IRequestOptionsManager } from "./IRequestOptionsManager";
import { RepriceParams } from "../core/request/parameters/Reprice";
import { OrderSplitParams } from "../core/request/parameters/OrderSplit";
import { OrderChangeParams } from "../core/request/parameters/OrderChange";
export interface IRequestManager {
    endpointManager: IEndpointManager;
    requestOptionsManager: IRequestOptionsManager;
    conversionStrategy: IConversionStrategy;
    extraConfiguration: Record<string, unknown>;
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): Result<IRequest>;
    createSearchRequest(params: SearchParams): Result<IRequest>;
    createPriceRequest(params: PriceParams): Result<IRequest>;
    createRepriceRequest(params: RepriceParams): Result<IRequest>;
    createFareRulesRequest(params: PriceParams | OrderRetrieveParams): Result<IRequest>;
    createBookRequest(params: BookParams): Result<IRequest>;
    createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest>;
    createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest>;
    createTicketIssueRequest(params: TicketIssueParams): Result<IRequest>;
    createRefundCalculationRequest(params: OrderRetrieveParams): Result<IRequest>;
    createRefundRequest(params: RefundParams): Result<IRequest>;
    createServiceListRequest(params: PriceParams | OrderRetrieveParams): Result<IRequest>;
    createServiceAddRequest(params: OrderChangeParams): Result<IRequest>;
    createOrderSplitRequest(params: OrderSplitParams): Result<IRequest>;
}
