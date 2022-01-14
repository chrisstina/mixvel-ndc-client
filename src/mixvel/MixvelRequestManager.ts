import {RequestGenerationError} from "../core/errors/RequestGenerationError";
import {IConversionStrategy} from "../services/conversion/IConversionSrategy";

import {
    BookParams,
    OrderRetrieveParams,
    PriceParams,
    RefundParams,
    SearchParams,
    TicketIssueParams
} from "../request/parameters";

import {MixvelRequest, MixvelRequestOptions} from "./MixvelRequest";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

import {AbstractParamsValidator} from "../request/validators/AbstractParamsValidator";
import {AuthParamsValidator} from "./validators/AuthParamsValidator";
import {BookParamsValidator} from "./validators/BookParamsValidator";
import {SearchParamsValidator} from "./validators/SearchParamsValidator";

import {MixvelMessageMapper} from "./mappers/MixvelMessageMapper";
import {SearchMessageMapper} from "./mappers/SearchMessageMapper";
import {BookMessageMapper} from "./mappers/BookMessageMapper";
import {IssueOrderMessageMapper} from "./mappers/IssueOrderMessageMapper";

import {GenericNDCMessage} from "./messages/GenericNDCMessage";
import {Mixvel_OfferPriceRQ} from "./messages/Mixvel_OfferPriceRQ";
import {Mixvel_OrderRetrieveRQ} from "./messages/Mixvel_OrderRetrieveRQ";
import {Mixvel_OrderCancelRQ} from "./messages/Mixvel_OrderCancelRQ";
import {Mixvel_ServiceListRQ} from "./messages/Mixvel_ServiceListRQ";
import {RefundOrderMessageMapper} from "./mappers/RefundOrderMessageMapper";

export class MixvelRequestOptionsManager {
    static create(params: {
                      endpoint: string,
                      method?: "GET" | "POST",
                      headers?: {}
                  }
    ): MixvelRequestOptions {
        return {
            endpoint: params.endpoint,
            method: params.method || "POST",
            headers: params.headers || {
                "accept": "application/xml",
                "Content-Type": "application/xml"
            }
        }
    }
}

export class MixvelEndpointManager {
    constructor(public endpoints: Map<string, string>) {
    }

    public getEndpointForMessage(message: GenericNDCMessage): string | never {
        return this.getEndpointByKey(message.constructor.name)
    }

    public getEndpointByKey(id: string): string | never {
        const endpoint = this.endpoints.get(id)
        if (endpoint) {
            return endpoint
        }
        throw new RequestGenerationError('No endpoint found for ' + id) // @todo
    }
}

export class MixvelRequestManager {
    constructor(
        public readonly endpointManager: MixvelEndpointManager,
        public conversionStrategy: IConversionStrategy) {
    }

    public createAuthRequest(params: { login: string, password: string, structureId: string }): MixvelRequest {
        AuthParamsValidator.validate(params)
        return new MixvelRequest(
            new MixvelAuthAppData(params.login, params.password, params.structureId),
            MixvelRequestOptionsManager.create({endpoint: this.endpointManager.getEndpointByKey('auth')}),
            this.conversionStrategy)
    }

    public createSearchRequest(params: SearchParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new SearchMessageMapper(params),
            validator: SearchParamsValidator
        })
    }

    public createPriceRequest(params: PriceParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OfferPriceRQ(params.offerId, params.offerItemIds)
                }
            }
        })
    }

    public createBookRequest(params: BookParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new BookMessageMapper(params),
            validator: BookParamsValidator
        })
    }

    public createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderRetrieveRQ(params.orderId)
                }
            }
        })
    }

    public createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_OrderCancelRQ(params.orderId)
                }
            }
        })
    }

    public createTicketIssueRequest(params: TicketIssueParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new IssueOrderMessageMapper(params), // @todo add specific validation
        })
    }

    public createRefundRequest(params: RefundParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new RefundOrderMessageMapper(params),
        })
    }

    public createRefundRequest(params: RefundParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: new RefundOrderMessageMapper(params),
        })
    }

    public createServiceListRequest(params: PriceParams): MixvelRequest {
        return this.createRequest(params, {
            mapper: {
                map(): GenericNDCMessage {
                    return new Mixvel_ServiceListRQ(params.offerId, params.offerItemIds)
                }
            }
        })
    }

    protected createRequest(requestParams: object, services: {
        mapper: MixvelMessageMapper,
        validator?: typeof AbstractParamsValidator
    }): MixvelRequest {
        // run specific mixvel validation
        if (services.validator) {
            services.validator.validate(requestParams)
        }

        // map to mixvel message
        const rq = services.mapper.map()

        return new MixvelRequest(
            new MixvelAppData<typeof rq>(rq),
            MixvelRequestOptionsManager.create({endpoint: this.endpointManager.getEndpointForMessage(rq)}),
            this.conversionStrategy)
    }
}