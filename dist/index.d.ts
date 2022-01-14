import { MixvelRequest } from "./mixvel/MixvelRequest";
import { AuthParams, BookParams, OrderRetrieveParams, PriceParams, RefundParams, SearchParams, TicketIssueParams } from "./request/parameters";
export declare function getAuthRequest(params: AuthParams): MixvelRequest;
export declare function getSearchRequest(params: SearchParams): MixvelRequest;
export declare function getPriceRequest(params: PriceParams): MixvelRequest;
/**
 * @param {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 * @return string
 */
export declare function getBookRequest(params: BookParams): MixvelRequest;
export declare function getOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
export declare function getTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
export declare function getOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
export declare function getServiceListRequest(params: PriceParams): MixvelRequest;
export declare function getRefundRequest(params: RefundParams): MixvelRequest;
