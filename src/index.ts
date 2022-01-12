import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelEndpointManager, MixvelRequestManager} from "./mixvel/MixvelRequestManager";

import {XmlConversionStrategy} from "./services/conversion/XmlConversionStrategy";

import {
    AuthParams,
    BookParams,
    OrderRetrieveParams,
    PriceParams,
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

export function getAuthRequest(props: AuthParams) {
    AuthParamsValidator.validate(props);
    return mixvelRequestManager.createAuthRequest(props)
}

export function getSearchRequest(props: SearchParams): MixvelRequest {
    SearchParamsValidator.validate(props)
    return mixvelRequestManager.createSearchRequest(props)
}

export function getPriceRequest(props: PriceParams): MixvelRequest {
    PriceParamsValidator.validate(props)
    return mixvelRequestManager.createPriceRequest(props)
}

export function getBookRequest(props: BookParams): MixvelRequest {
    BookParamsValidator.validate(props)
    return mixvelRequestManager.createBookRequest(props)
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