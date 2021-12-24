import { MixvelRequest } from "./mixvel/MixvelRequest";
import { AuthParams } from "./request-params/AuthParams";
import { SearchParams } from "./request-params/SearchParams";
import { PriceParams } from "./request-params/PriceParams";
import { BookParams } from "./request-params/BookParams";
import { OrderRetrieveParams } from "./request-params/OrderRetrieveParams";
import { TicketIssueParams } from "./request-params/TicketIssueParams";
/**
 * @param {AuthParams} rq
 */
export declare function getAuthRequest(rq: AuthParams): MixvelRequest;
export declare function getSearchRequest(params: SearchParams): MixvelRequest;
export declare function getPriceRequest(params: PriceParams): MixvelRequest;
export declare function getBookRequest(params: BookParams): MixvelRequest;
export declare function getOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
export declare function getTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
export declare function getOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
