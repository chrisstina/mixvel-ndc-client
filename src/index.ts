import {IRequestManager} from "./interfaces/IRequestManager";
import {IProvider} from "./interfaces/IProvider";
import {IResponseManager} from "./interfaces/IResponseManager";
import {IRequest} from "./interfaces/IRequest";
import {IResponseMessage} from "./interfaces/IResponseMessage";
import {IResponseError} from "./interfaces/IResponseError";

import {Result} from "./core/Result";
import {Provider} from "./core/Provider";
import {ProviderLocator} from "./core/ProviderLocator";
import ResponseParsingError from "./core/errors/ResponseParsingError";

import {ObjectToXmlConversionStrategy} from "./services/conversion/ObjectToXmlConversionStrategy";
import {XmlToObjectConversionStrategy} from "./services/conversion/XmlToObjectConversionStrategy";
import {ObjectToXmlNDCConversionStrategy} from "./services/conversion/ObjectToXmlNDCConversionStrategy";
// import {XmlNDCToObjectConversionStrategy} from "./services/conversion/XmlNDCToObjectConversionStrategy";
import {RequestOptionsManager} from "./core/request/RequestOptionsManager";
import {AuthParams, AuthProps} from "./core/request/parameters/Auth";
import {SearchParams, SearchProps} from "./core/request/parameters/Search";
import {PriceParams, PriceProps} from "./core/request/parameters/Price";
import {OrderRetrieveParams, OrderRetrieveProps} from "./core/request/parameters/OrderRetrieve";
import {BookParams, BookProps} from "./core/request/parameters/Book";
import {TicketIssueParams, TicketIssueProps} from "./core/request/parameters/TicketIssue";
import {RefundParams, RefundProps} from "./core/request/parameters/Refund";

// Provider-specific
import {allowedDataLists} from "./providers/mixvel/constants/datalist";
import {MixvelEndpointManager, MixvelRequestManager} from "./providers/mixvel/MixvelRequestManager";
import {MixvelResponseManager} from "./providers/mixvel/MixvelResponseManager";
import {DataList} from "./providers/mixvel/DataList";
import {TicketMeRequestManager} from "./providers/ticketme/TicketMeRequestManager";
import {XmlNDCToObjectConversionStrategy} from "./services/conversion/XmlNDCToObjectConversionStrategy";
import {TicketMeResponseManager} from "./providers/ticketme/TicketMeResponseManager";

const pojoToXml = new ObjectToXmlConversionStrategy(),
    xmlToPojo = new XmlToObjectConversionStrategy(),
    requestOptionsManager = new RequestOptionsManager()

// ================ Provider generation =================

// Mixvel provider
ProviderLocator.register('mixvel', new Provider(
    new MixvelRequestManager(
        new MixvelEndpointManager(require('./providers/mixvel/config/endpoints').endpoints), // @todo take from config
        pojoToXml,
        requestOptionsManager
    ),
    new MixvelResponseManager(
        require('./providers/mixvel/config/responses').allowedNodeNames,  // @todo take from config
        xmlToPojo
    )
))

// TicketMe provider
const ndcVersion = '172' // @todo take from config
const pojoToNDC = new ObjectToXmlNDCConversionStrategy(ndcVersion),
    NDCToPojo = new XmlNDCToObjectConversionStrategy(ndcVersion)
ProviderLocator.register('ticketme', new Provider(
    new TicketMeRequestManager(
        new MixvelEndpointManager(require('./providers/ticketme/config/endpoints').endpoints),  // @todo take from config
        pojoToNDC,
        requestOptionsManager
    ),
    new TicketMeResponseManager(NDCToPojo)
))

export function createNDCService(provider: string | IProvider, providerConfig = {}) {
    const theProvider: IProvider = (typeof provider === "string")
        ? ProviderLocator.get(provider)
        : provider

    theProvider.extraConfiguration = providerConfig

    let requestManager: IRequestManager = theProvider.requestManager
    let responseManager: IResponseManager = theProvider.responseManager

    function setProviderConfig(providerConfig: {}) {
        theProvider.extraConfiguration = providerConfig
    }

    // ========== Request management ==============

    function getAuthRequest(props: AuthProps): Result<IRequest> {
        const paramsOrError = AuthParams.create<AuthProps, AuthParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createAuthRequest(paramsOrError.getValue()));
    }

    function getSearchRequest(props: SearchProps): Result<IRequest> {
        const paramsOrError = SearchParams.create<typeof props, SearchParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createSearchRequest(paramsOrError.getValue()))
    }

    function getPriceRequest(props: PriceProps): Result<IRequest> {
        const paramsOrError = PriceParams.create<typeof props, PriceParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createPriceRequest(paramsOrError.getValue()))
    }

    function getFareRulesRequest(props: PriceProps): Result<IRequest> {
        const paramsOrError = PriceParams.create<typeof props, PriceParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createFareRulesRequest(paramsOrError.getValue()))
    }

    /**
     * @props {{ offerId: string, offerItemIds: {id: string, ptc: "ADULT"|"CHILD"|"INFANT"}[],passengers: {ptc: "ADULT"|"CHILD"|"INFANT"personalInfo: {firstName: string,middleName: string,lastName: string,gender: "M"|"F",dob: Date,},identityDocument: {type: "PASSPORT" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL",dateOfIssue: Date,dateOfExpiry: Date,issuingCountry: string,number: string},contacts: {email: string,phoneNumber: string}}[]}} params
     */
    function getBookRequest(props: BookProps): Result<IRequest> {
        const paramsOrError = BookParams.create<typeof props, BookParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createBookRequest(paramsOrError.getValue()))
    }

    function getOrderRetrieveRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create<typeof props, OrderRetrieveParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createOrderRetrieveRequest(paramsOrError.getValue()))
    }

    function getTicketIssueRequest(props: TicketIssueProps): Result<IRequest> {
        const paramsOrError = TicketIssueParams.create<typeof props, TicketIssueParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createTicketIssueRequest(paramsOrError.getValue()))
    }

    function getOrderCancelRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create<typeof props, OrderRetrieveParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createOrderCancelRequest(paramsOrError.getValue()))
    }

    function getServiceListRequest(props: PriceProps): Result<IRequest> {
        const paramsOrError = PriceParams.create<typeof props, PriceParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createServiceListRequest(paramsOrError.getValue()))
    }

    function getRefundCalculationRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create<typeof props, OrderRetrieveParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createRefundCalculationRequest(paramsOrError.getValue()))
    }

    function getRefundRequest(props: RefundProps): Result<IRequest> {
        const paramsOrError = RefundParams.create<typeof props, RefundParams>(props)
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : Result.ok<IRequest>(requestManager.createRefundRequest(paramsOrError.getValue()))
    }

    // ========== Response management ==============

    /**
     * @param {string|{}} data - response XML or JSON with errors
     */
    function getResponse(data: string | { status: string, errors: string[], title: string }): Promise<Result<IResponseMessage | IResponseError>> {
        if (typeof data !== "string" && data.errors && Object.values(data.errors).length > 0) {
            return Promise.resolve().then(() => Result.fail<IResponseError>(`${data.title}: ${Object.values(data.errors)}`))
        }

        if (typeof data === "string") {
            return responseManager.getResponse(data)
                .then(mixvelResponse => {
                    return Result.ok<IResponseMessage | IResponseError>(mixvelResponse)
                })
                .catch(err => Result.fail<IResponseError>(err.message))
        }
        return Promise.reject(new ResponseParsingError('Unknown input format'))
    }

    function extractDataLists(dataListSource: Array<{}>) {
        const dl: { [key: string]: DataList } = {}
        for (const [keyTitle, dataListTitle] of Object.entries(allowedDataLists)) {
            dl[keyTitle] = DataList.create(dataListTitle, dataListSource)
        }
        return dl
    }

    return {
        getAuthRequest,
        getSearchRequest,
        getPriceRequest,
        getBookRequest,
        getFareRulesRequest,
        getServiceListRequest,
        getOrderRetrieveRequest,
        getTicketIssueRequest,
        getOrderCancelRequest,
        getRefundCalculationRequest,
        getRefundRequest,
        getResponse,
        extractDataLists,
        setProviderConfig
    }
}