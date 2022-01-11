import {RequestGenerationError} from "../core/errors/RequestGenerationError";
import {IConversionStrategy} from "../services/conversion/IConversionSrategy";

import {SearchParams, BookParams, OrderRetrieveParams, PriceParams, TicketIssueParams} from "../request/parameters";

import {MixvelRequest, MixvelRequestOptions} from "./MixvelRequest";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

import {AbstractParamsValidator} from "../request/validators/AbstractParamsValidator";
import {BookParamsValidator} from "./validators/BookParamsValidator";
import {SearchParamsValidator} from "./validators/SearchParamsValidator";

import {MixvelMessageMapper} from "./mappers/MixvelMessageMapper";
import {SearchMessageMapper} from "./mappers/SearchMessageMapper";
import {BookMessageMapper} from "./mappers/BookMessageMapper";
import {ChangeOrderMessageMapper} from "./mappers/ChangeOrderMessageMapper";

import {GenericNDCMessage} from "./messages/GenericNDCMessage";
import {Mixvel_OfferPriceRQ} from "./messages/Mixvel_OfferPriceRQ";
import {Mixvel_OrderRetrieveRQ} from "./messages/Mixvel_OrderRetrieveRQ";
import {Mixvel_OrderCancelRQ} from "./messages/Mixvel_OrderCancelRQ";

export class MixvelEndpointManager {
    public endpoints = require('./config/endpoints').endpoints

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
    public endpointManager = new MixvelEndpointManager()

    constructor(public conversionStrategy: IConversionStrategy) {
        this.conversionStrategy = conversionStrategy;
    }

    public createAuthRequest(params: { login: string, password: string, structureId: string }): MixvelRequest {
        // @todo map request options
        const mixvelRequestOptions: MixvelRequestOptions = {
            endpoint: this.endpointManager.getEndpointByKey('auth'),
            method: "GET"
        }

        return new MixvelRequest(
            new MixvelAuthAppData(params.login, params.password, params.structureId),
            mixvelRequestOptions,
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
            mapper: new ChangeOrderMessageMapper(params), // @todo add specific validation
        })
    }

    protected createRequest(params: object, options: {
        mapper: MixvelMessageMapper,
        validator?: typeof AbstractParamsValidator
    }): MixvelRequest {
        // run specific mixvel validation
        if (options.validator) {
            options.validator.validate(params)
        }

        // map to mixvel message
        const rq = options.mapper.map()

        // @todo map request options
        const mixvelRequestOptions: MixvelRequestOptions = {
            endpoint: this.endpointManager.getEndpointForMessage(rq),
            method: "GET"
        }

        return new MixvelRequest(
            new MixvelAppData<typeof rq>(rq),
            mixvelRequestOptions,
            this.conversionStrategy)
    }
}