import { MixvelRequest } from "./mixvel/MixvelRequest";
import { AuthParams, BookParams, OrderRetrieveParams, PriceParams, RefundParams, SearchParams, TicketIssueParams } from "./request/parameters";
export declare function getAuthRequest(params: AuthParams): MixvelRequest;
/**
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getSearchRequest(params: SearchParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getPriceRequest(params: PriceParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getFareRulesRequest(params: PriceParams): MixvelRequest;
/**
 * @param {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getBookRequest(params: BookParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getServiceListRequest(params: PriceParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getRefundCalculationRequest(params: OrderRetrieveParams): MixvelRequest;
/**
 *
 * @param params
 * @return {"headers": {},"body": string, "options": {"method": "GET" | "POST","endpoint": string}}
 */
export declare function getRefundRequest(params: RefundParams): MixvelRequest;
