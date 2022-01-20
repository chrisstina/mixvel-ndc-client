import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelEndpointManager, MixvelRequestManager} from "./mixvel/MixvelRequestManager";
import {Result} from "./core/Result";

import {XmlConversionStrategy} from "./services/conversion/XmlConversionStrategy";

import {AuthParams, AuthProps} from "./request/parameters/Auth";
import {SearchParams, SearchProps} from "./request/parameters/Search";
import {PriceParams, PriceProps} from "./request/parameters/Price";
import {OrderRetrieveParams, OrderRetrieveProps} from "./request/parameters/OrderRetrieve";
import {BookParams, BookProps} from "./request/parameters/Book";
import {TicketIssueParams, TicketIssueProps} from "./request/parameters/TicketIssue";
import {RefundParams, RefundProps} from "./request/parameters/Refund";

const mixvelRequestManager = new MixvelRequestManager(
    new MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints),
    new XmlConversionStrategy()
)

export function getAuthRequest(props: AuthProps): Result<MixvelRequest> {
    const paramsOrError = AuthParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createAuthRequest(paramsOrError.getValue()));
}

export function getSearchRequest(props: SearchProps): Result<MixvelRequest> {
    const paramsOrError = SearchParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createSearchRequest(paramsOrError.getValue()))
}

export function getPriceRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createPriceRequest(paramsOrError.getValue()))
}

export function getFareRulesRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createFareRulesRequest(paramsOrError.getValue()))
}

/**
 * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 */
export function getBookRequest(props: BookProps): Result<MixvelRequest> {
    const paramsOrError = BookParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createBookRequest(paramsOrError.getValue()))
}

export function getOrderRetrieveRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createOrderRetrieveRequest(paramsOrError.getValue()))
}

export function getTicketIssueRequest(props: TicketIssueProps): Result<MixvelRequest> {
    const paramsOrError = TicketIssueParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createTicketIssueRequest(paramsOrError.getValue()))
}

export function getOrderCancelRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createOrderCancelRequest(paramsOrError.getValue()))
}

export function getServiceListRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createServiceListRequest(paramsOrError.getValue()))
}

export function getRefundCalculationRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createRefundCalculationRequest(paramsOrError.getValue()))
}

export function getRefundRequest(props: RefundProps): Result<MixvelRequest> {
    const paramsOrError = RefundParams.create(props)
    return paramsOrError.isFailure
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createRefundRequest(paramsOrError.getValue()))
}