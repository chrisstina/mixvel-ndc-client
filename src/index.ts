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
import {RequestEndpointManager} from "./core/request/RequestEndpointManager";
import {RequestOptionsManager} from "./core/request/RequestOptionsManager";
import {AuthParams, AuthProps} from "./core/request/parameters/Auth";
import {SearchParams, SearchProps} from "./core/request/parameters/Search";
import {PriceParams, PriceProps} from "./core/request/parameters/Price";
import {OrderRetrieveParams, OrderRetrieveProps} from "./core/request/parameters/OrderRetrieve";
import {BookParams, BookProps} from "./core/request/parameters/Book";
import {TicketIssueParams, TicketIssueProps} from "./core/request/parameters/TicketIssue";
import {RefundParams, RefundProps} from "./core/request/parameters/Refund";
import {RepriceParams, RepriceProps} from "./core/request/parameters/Reprice";
import {isOrderRetrieveProps, isPriceProps} from "./core/request/typeguards";

// Provider-specific
import {MixvelRequestManager} from "./providers/mixvel/MixvelRequestManager";
import {MixvelResponseManager} from "./providers/mixvel/MixvelResponseManager";
import {TicketMeRequestManager} from "./providers/ticketme/TicketMeRequestManager";
import {TicketMeResponseManager} from "./providers/ticketme/TicketMeResponseManager";
import {IDataList} from "./interfaces/IDataList";
import {OrderSplitParams, OrderSplitProps} from "./core/request/parameters/OrderSplit";

const pojoToXml = new ObjectToXmlConversionStrategy(),
    xmlToPojo = new XmlToObjectConversionStrategy(),
    requestOptionsManager = new RequestOptionsManager()

// ================ Provider generation =================

// Mixvel provider
ProviderLocator.register('mixvel', new Provider(
    new MixvelRequestManager(
        new RequestEndpointManager(require('./providers/mixvel/config/endpoints').endpoints), // @todo take from config
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
const pojoToNDC = new ObjectToXmlNDCConversionStrategy(ndcVersion)

ProviderLocator.register('ticketme', new Provider(
    new TicketMeRequestManager(
        new RequestEndpointManager(require('./providers/ticketme/config/endpoints').endpoints),  // @todo take from config
        pojoToNDC,
        requestOptionsManager
    ),
    new TicketMeResponseManager(xmlToPojo)
))

export function createNDCService(provider: string | IProvider, providerConfig = {}) {
    const theProvider: IProvider = (typeof provider === "string")
        ? ProviderLocator.get(provider)
        : provider

    theProvider.extraConfiguration = providerConfig

    const requestManager: IRequestManager = theProvider.requestManager
    const responseManager: IResponseManager = theProvider.responseManager

    function setProviderConfig(providerConfig: Record<string, unknown>) {
        theProvider.extraConfiguration = providerConfig
    }

    // ========== Request management ==============

    function getAuthRequest(props: AuthProps): Result<IRequest> {
        const paramsOrError = AuthParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createAuthRequest(paramsOrError.getValue())
    }

    function getSearchRequest(props: SearchProps): Result<IRequest> {
        const paramsOrError = SearchParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createSearchRequest(paramsOrError.getValue())
    }

    function getPriceRequest(props: PriceProps): Result<IRequest> {
        const paramsOrError = PriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createPriceRequest(paramsOrError.getValue())
    }

    function getFareRulesRequest(props: PriceProps | OrderRetrieveParams): Result<IRequest> {
        let paramsOrError
        if (isPriceProps(props)) {
            paramsOrError = PriceParams.create(props);
        } else if (isOrderRetrieveProps(props)) {
            paramsOrError = OrderRetrieveParams.create(props);
        }
        if (paramsOrError === undefined) {
            return Result.fail<IRequest>('Could not guess params type')
        }
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createFareRulesRequest(paramsOrError.getValue())
    }

    function getBookRequest(props: BookProps): Result<IRequest> {
        const paramsOrError = BookParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createBookRequest(paramsOrError.getValue())
    }

    function getOrderRetrieveRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createOrderRetrieveRequest(paramsOrError.getValue())
    }

    function getTicketIssueRequest(props: TicketIssueProps): Result<IRequest> {
        const paramsOrError = TicketIssueParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createTicketIssueRequest(paramsOrError.getValue())
    }

    function getOrderCancelRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createOrderCancelRequest(paramsOrError.getValue())
    }

    function getServiceListRequest(props: PriceProps | OrderRetrieveProps): Result<IRequest> {
        let paramsOrError;
        if (isPriceProps(props)) {
            paramsOrError = PriceParams.create(props);
        } else if (isOrderRetrieveProps(props)) {
            paramsOrError = OrderRetrieveParams.create(props);
        }
        if (paramsOrError === undefined) {
            return Result.fail<IRequest>('Could not guess params type')
        }
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createServiceListRequest(paramsOrError.getValue())
    }

    function getRefundCalculationRequest(props: OrderRetrieveProps): Result<IRequest> {
        const paramsOrError = OrderRetrieveParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createRefundCalculationRequest(paramsOrError.getValue())
    }

    function getRefundRequest(props: RefundProps): Result<IRequest> {
        const paramsOrError = RefundParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createRefundRequest(paramsOrError.getValue())
    }

    function getRepriceRequest(props: RepriceProps): Result<IRequest> {
        const paramsOrError = RepriceParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createRepriceRequest(paramsOrError.getValue())
    }

    function getOrderSplitRequest(props: OrderSplitProps): Result<IRequest> {
        const paramsOrError = OrderSplitParams.create(props);
        return paramsOrError.isFailure && paramsOrError.error
            ? Result.fail<IRequest>(paramsOrError.error)
            : requestManager.createOrderSplitRequest(paramsOrError.getValue())
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

    /**
     * @param dataListSource
     * @return {paxList?: {}, paxJourneyList?: {}, segmentList?: {}, priceClassList?: {}, bagList?: {}, validatingPartyList?: {}, odList?: {}, contactList?: {},  serviceList?: {}, penaltyList?: {}, flightList?: {}, fareList?: {},descriptionList?: {}, seatList?:{} } Possible values
     */
    function extractDataLists(dataListSource: Record<string, unknown>[]) {
        const dl: { [key: string]: IDataList } = {}
        for (const [keyTitle, dataListInfo] of Object.entries(responseManager.allowedDatalists)) {
            let dataListTitle, entityTitle
            if (typeof dataListInfo === "string") {
                dataListTitle = dataListInfo
            } else {
                [dataListTitle, entityTitle] = dataListInfo
            }
            dl[keyTitle] = responseManager.createDataList(dataListTitle, dataListSource, entityTitle)
        }
        return dl
    }

    return {
        getAuthRequest,
        getSearchRequest,
        getPriceRequest,
        getBookRequest,
        getRepriceRequest,
        getFareRulesRequest,
        getServiceListRequest,
        getOrderRetrieveRequest,
        getTicketIssueRequest,
        getOrderCancelRequest,
        getRefundCalculationRequest,
        getRefundRequest,
        getOrderSplitRequest,
        getResponse,
        extractDataLists,
        setProviderConfig
    }
}