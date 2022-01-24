import { MixvelRequest } from "./mixvel/MixvelRequest";
import { Result } from "./core/Result";
import { AuthProps } from "./request/parameters/Auth";
import { SearchProps } from "./request/parameters/Search";
import { PriceProps } from "./request/parameters/Price";
import { OrderRetrieveProps } from "./request/parameters/OrderRetrieve";
import { BookProps } from "./request/parameters/Book";
import { TicketIssueProps } from "./request/parameters/TicketIssue";
import { RefundProps } from "./request/parameters/Refund";
import { MixvelResponseError, MixvelResponseMessage } from "./mixvel/MixvelResponseManager";
export declare function getAuthRequest(props: AuthProps): Result<MixvelRequest>;
export declare function getSearchRequest(props: SearchProps): Result<MixvelRequest>;
export declare function getPriceRequest(props: PriceProps): Result<MixvelRequest>;
export declare function getFareRulesRequest(props: PriceProps): Result<MixvelRequest>;
/**
 * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 */
export declare function getBookRequest(props: BookProps): Result<MixvelRequest>;
export declare function getOrderRetrieveRequest(props: OrderRetrieveProps): Result<MixvelRequest>;
export declare function getTicketIssueRequest(props: TicketIssueProps): Result<MixvelRequest>;
export declare function getOrderCancelRequest(props: OrderRetrieveProps): Result<MixvelRequest>;
export declare function getServiceListRequest(props: PriceProps): Result<MixvelRequest>;
export declare function getRefundCalculationRequest(props: OrderRetrieveProps): Result<MixvelRequest>;
export declare function getRefundRequest(props: RefundProps): Result<MixvelRequest>;
/**
 * @param {string|{}} data - response XML or JSON with errors
 */
export declare function getResponse(data: string | {
    status: string;
    errors: string[];
    title: string;
}): Promise<Result<MixvelResponseMessage | MixvelResponseError>>;
