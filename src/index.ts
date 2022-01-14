import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelEndpointManager, MixvelRequestManager} from "./mixvel/MixvelRequestManager";

import {XmlConversionStrategy} from "./services/conversion/XmlConversionStrategy";

import {
    AuthParams,
    BookParams,
    OrderRetrieveParams,
    PriceParams, RefundParams,
    SearchParams, TicketIssueParams
} from "./request/parameters";

import {SearchParamsValidator} from "./request/validators/SearchParamsValidator";
import {AuthParamsValidator} from "./request/validators/AuthParamsValidator";
import {PriceParamsValidator} from "./request/validators/PriceParamsValidator";
import {OrderRetrieveParamsValidator} from "./request/validators/OrderRetrieveParamsValidator";
import {TicketIssueParamsValidator} from "./request/validators/TicketIssueParamsValidator";
import {BookParamsValidator} from "./request/validators/BookParamsValidator";

const mixvelRequestManager = new MixvelRequestManager(
    new MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints),
    new XmlConversionStrategy()
)

export function getAuthRequest(params: AuthParams) {
    AuthParamsValidator.validate(params);
    return mixvelRequestManager.createAuthRequest(params)
}

export function getSearchRequest(params: SearchParams): MixvelRequest {
    SearchParamsValidator.validate(params)
    return mixvelRequestManager.createSearchRequest(params)
}

export function getPriceRequest(params: PriceParams): MixvelRequest {
    PriceParamsValidator.validate(params)
    return mixvelRequestManager.createPriceRequest(params)
}

export function getFareRulesRequest(params: PriceParams): MixvelRequest {
    PriceParamsValidator.validate(params)
    return mixvelRequestManager.createFareRulesRequest(params)
}

/**
 * @param {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 * @return string
 */
export function getBookRequest(params: BookParams): MixvelRequest {
    BookParamsValidator.validate(params)
    return mixvelRequestManager.createBookRequest(params)
}

export function getOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest {
    OrderRetrieveParamsValidator.validate(params)
    return mixvelRequestManager.createOrderRetrieveRequest(params)
}

export function getTicketIssueRequest(params: TicketIssueParams): MixvelRequest {
    TicketIssueParamsValidator.validate(params)
    return mixvelRequestManager.createTicketIssueRequest(params)
}

export function getOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest {
    OrderRetrieveParamsValidator.validate(params)
    return mixvelRequestManager.createOrderCancelRequest(params)
}

export function getServiceListRequest(params: PriceParams): MixvelRequest {
    PriceParamsValidator.validate(params)
    return mixvelRequestManager.createServiceListRequest(params)
}

export function getRefundCalculationRequest(params: OrderRetrieveParams) {
    return mixvelRequestManager.createRefundCalculationRequest(params)
}

export function getRefundRequest(params: RefundParams) {
    return mixvelRequestManager.createRefundRequest(params)
}