import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelEndpointManager, MixvelRequestManager} from "./mixvel/MixvelRequestManager";
import {Result} from "./core/Result";

import {ObjectToXmlConversionStrategy} from "./services/conversion/ObjectToXmlConversionStrategy";
import {XmlToObjectConversionStrategy} from "./services/conversion/XmlToObjectConversionStrategy";

import {AuthParams, AuthProps} from "./request/parameters/Auth";
import {SearchParams, SearchProps} from "./request/parameters/Search";
import {PriceParams, PriceProps} from "./request/parameters/Price";
import {OrderRetrieveParams, OrderRetrieveProps} from "./request/parameters/OrderRetrieve";
import {BookParams, BookProps} from "./request/parameters/Book";
import {TicketIssueParams, TicketIssueProps} from "./request/parameters/TicketIssue";
import {RefundParams, RefundProps} from "./request/parameters/Refund";

import {MixvelResponseManager, MixvelResponseError, MixvelResponseMessage} from "./mixvel/MixvelResponseManager";
import ResponseParsingError from "./core/errors/ResponseParsingError";

const mixvelRequestManager = new MixvelRequestManager(
    new MixvelEndpointManager(require('./mixvel/config/endpoints').endpoints),
    new ObjectToXmlConversionStrategy()
);

const mixvelResponseManager = new MixvelResponseManager(
    require('./mixvel/config/responses').allowedNodeNames,
    new XmlToObjectConversionStrategy()
);

export function getAuthRequest(props: AuthProps): Result<MixvelRequest> {
    const paramsOrError = AuthParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createAuthRequest(paramsOrError.getValue()));
}

export function getSearchRequest(props: SearchProps): Result<MixvelRequest> {
    const paramsOrError = SearchParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createSearchRequest(paramsOrError.getValue()))
}

export function getPriceRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createPriceRequest(paramsOrError.getValue()))
}

export function getFareRulesRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createFareRulesRequest(paramsOrError.getValue()))
}

/**
 * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
 */
export function getBookRequest(props: BookProps): Result<MixvelRequest> {
    const paramsOrError = BookParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createBookRequest(paramsOrError.getValue()))
}

export function getOrderRetrieveRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createOrderRetrieveRequest(paramsOrError.getValue()))
}

export function getTicketIssueRequest(props: TicketIssueProps): Result<MixvelRequest> {
    const paramsOrError = TicketIssueParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createTicketIssueRequest(paramsOrError.getValue()))
}

export function getOrderCancelRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createOrderCancelRequest(paramsOrError.getValue()))
}

export function getServiceListRequest(props: PriceProps): Result<MixvelRequest> {
    const paramsOrError = PriceParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createServiceListRequest(paramsOrError.getValue()))
}

export function getRefundCalculationRequest(props: OrderRetrieveProps): Result<MixvelRequest> {
    const paramsOrError = OrderRetrieveParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createRefundCalculationRequest(paramsOrError.getValue()))
}

export function getRefundRequest(props: RefundProps): Result<MixvelRequest> {
    const paramsOrError = RefundParams.create(props)
    return paramsOrError.isFailure && paramsOrError.error
        ? Result.fail<MixvelRequest>(paramsOrError.error)
        : Result.ok<MixvelRequest>(mixvelRequestManager.createRefundRequest(paramsOrError.getValue()))
}

/**
 * @param {string|{}} data - response XML or JSON with errors
 */
export function getResponse(data: string | { status: string, errors: string[], title: string }): Promise<Result<MixvelResponseMessage | MixvelResponseError>> {
    if (typeof data !== "string" && data.errors && data.errors.length) {
        return Promise.resolve().then(() => Result.fail<MixvelResponseError>(data.title) )
    }

    if (typeof data === "string") {
        return mixvelResponseManager.getResponse(data)
            .then(mixvelResponse => {
                return Result.ok<MixvelResponseMessage | MixvelResponseError>(mixvelResponse)
            })
            .catch(err => Result.fail<MixvelResponseError>(err.message))
    }
    return Promise.reject(new ResponseParsingError('Unknown input format'))
}