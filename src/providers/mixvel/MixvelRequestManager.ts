import {IRequestManager} from "../../interfaces/IRequestManager";
import {IEndpointManager} from "../../interfaces/IEndpointManager";
import {IRequestOptionsManager} from "../../interfaces/IRequestOptionsManager";
import {IMessageMapper} from "../../interfaces/IMessageMapper";
import {GenericNDCMessage} from "../../interfaces/GenericNDCMessage";

import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";

import {MixvelRequest} from "./MixvelRequest";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

import {SearchParams} from "../../core/request/parameters/Search";
import {PriceParams} from "../../core/request/parameters/Price";
import {BookParams} from "../../core/request/parameters/Book";
import {TicketIssueParams} from "../../core/request/parameters/TicketIssue";
import {RefundParams} from "../../core/request/parameters/Refund";
import {OrderRetrieveParams} from "../../core/request/parameters/OrderRetrieve";

import {AbstractParamsValidator} from "../../core/request/AbstractParamsValidator";
import {BookParamsValidator} from "./validators/BookParamsValidator";

import {SearchMessageMapper} from "./mappers/SearchMessageMapper";
import {BookMessageMapper} from "./mappers/BookMessageMapper";
import {IssueOrderMessageMapper} from "./mappers/IssueOrderMessageMapper";
import {RefundOrderMessageMapper} from "./mappers/RefundOrderMessageMapper";

import {Mixvel_OfferPriceRQ} from "./messages/Mixvel_OfferPriceRQ";
import {Mixvel_OrderRetrieveRQ} from "./messages/Mixvel_OrderRetrieveRQ";
import {Mixvel_OrderCancelRQ} from "./messages/Mixvel_OrderCancelRQ";
import {Mixvel_ServiceListRQ} from "./messages/Mixvel_ServiceListRQ";
import {Mixvel_OrderReshopRQ} from "./messages/Mixvel_OrderReshopRQ";
import {Mixvel_OrderRulesRQ} from "./messages/Mixvel_OrderRulesRQ";

export class MixvelRequestManager implements IRequestManager {
    constructor(
        readonly endpointManager: IEndpointManager,
        public conversionStrategy: IConversionStrategy,
        public requestOptionsManager: IRequestOptionsManager) {
    }

    public extraConfiguration = {} // no extra config here

    createAuthRequest(params: { login: string, password: string, structureId: string }): MixvelRequest {
        return new MixvelRequest(
            new MixvelAuthAppData(params.login, params.password, params.structureId),
            this.requestOptionsManager.create({endpoint: this.endpointManager.getEndpointByKey('auth')}),
            this.conversionStrategy)
    }

    createSearchRequest(params: SearchParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper(params)
        })
    }

    createPriceRequest(params: PriceParams): MixvelRequest {
        const restructuredParams = MixvelRequestManager.preparePriceParams(params)
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OfferPriceRQ(restructuredParams.offerId, restructuredParams.offerItemIds)
                }
            }
        })
    }

    /**
     * @param params
     * @private
     */
    private static preparePriceParams(params: PriceParams) {
        const offerId = params.offers[0].offerId,
            offerItemIds = params.offers.reduce((items: string[], {offerItems}) => {
                return [...items, ...offerItems.map(({offerItemId}) => offerItemId)]
            }, [])

        return {offerId, offerItemIds}
    }

    createBookRequest(params: BookParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new BookMessageMapper(params),
            validator: BookParamsValidator
        })
    }

    createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderRetrieveRQ(params.orderId)
                }
            }
        })
    }

    createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderCancelRQ(params.orderId)
                }
            }
        })
    }

    createTicketIssueRequest(params: TicketIssueParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new IssueOrderMessageMapper(params), // @todo add specific validation
        })
    }

    createRefundCalculationRequest(params: OrderRetrieveParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderReshopRQ(params.orderId)
                }
            }
        })
    }

    createRefundRequest(params: RefundParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new RefundOrderMessageMapper(params),
        })
    }

    createFareRulesRequest(params: PriceParams): MixvelRequest {
        const restructuredParams = MixvelRequestManager.preparePriceParams(params)
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderRulesRQ(restructuredParams.offerId, restructuredParams.offerItemIds)
                }
            }
        })
    }

    createRequest(requestParams: object, services: {
        mapper: IMessageMapper,
        validator?: AbstractParamsValidator
    }): MixvelRequest {
        // run specific mixvel validation
        if (services.validator) {
            services.validator.validate(requestParams)
        }

        // map to mixvel message
        const rq = services.mapper.map()

        return new MixvelRequest(
            new MixvelAppData<typeof rq>(rq),
            this.requestOptionsManager.create({endpoint: this.endpointManager.getEndpointForMessage(rq)}),
            this.conversionStrategy)
    }

    createServiceListRequest(params: PriceParams): MixvelRequest {
        const restructuredParams = MixvelRequestManager.preparePriceParams(params)
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_ServiceListRQ(restructuredParams.offerId, restructuredParams.offerItemIds)
                }
            }
        })
    }
}