import { MixvelRequest } from "./mixvel/MixvelRequest";
import { AuthParams, BookParams, OrderRetrieveParams, PriceParams, SearchParams, TicketIssueParams } from "./request/parameters";
export declare function getAuthRequest(props: AuthParams): MixvelRequest;
export declare function getSearchRequest(props: SearchParams): MixvelRequest;
export declare function getPriceRequest(props: PriceParams): MixvelRequest;
export declare function getBookRequest(props: BookParams): MixvelRequest;
export declare function getOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
export declare function getTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
export declare function getOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
