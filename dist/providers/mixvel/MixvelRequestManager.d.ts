import { IRequestManager } from "../../interfaces/IRequestManager";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
import { IRequestOptionsManager } from "../../interfaces/IRequestOptionsManager";
import { IMessageMapper } from "../../interfaces/IMessageMapper";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { MixvelRequest } from "./MixvelRequest";
import { SearchParams } from "../../core/request/parameters/Search";
import { PriceParams } from "../../core/request/parameters/Price";
import { BookParams } from "../../core/request/parameters/Book";
import { TicketIssueParams } from "../../core/request/parameters/TicketIssue";
import { RefundParams } from "../../core/request/parameters/Refund";
import { OrderRetrieveParams } from "../../core/request/parameters/OrderRetrieve";
import { AbstractParamsValidator } from "../../core/request/AbstractParamsValidator";
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
    /**
     * @param params
     * @private
     */
    private static preparePriceParams;
    createPriceRequest(params: PriceParams): MixvelRequest;
    createBookRequest(params: BookParams): MixvelRequest;
    createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
    createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
    createTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
    createRefundCalculationRequest(params: OrderRetrieveParams): MixvelRequest;
    createRefundRequest(params: RefundParams): MixvelRequest;
    createFareRulesRequest(params: PriceParams): MixvelRequest;
    createRequest(requestParams: object, services: {
        mapper: IMessageMapper;
        validator?: AbstractParamsValidator;
    }): MixvelRequest;
    createServiceListRequest(params: PriceParams): MixvelRequest;
}
