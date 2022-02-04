import assert from "assert";
import {MethodNotImplemented} from "../../core/errors/MethodNotImplemented";

import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";

import {IRequestManager} from "../../interfaces/IRequestManager";
import {IMessageMapper} from "../../interfaces/IMessageMapper";
import {IEndpointManager} from "../../interfaces/IEndpointManager";
import {IRequestOptionsManager} from "../../interfaces/IRequestOptionsManager";

import {BookParams} from "../../request/parameters/Book";
import {PriceParams} from "../../request/parameters/Price";
import {OrderRetrieveParams} from "../../request/parameters/OrderRetrieve";
import {RefundParams} from "../../request/parameters/Refund";
import {IRequest} from "../../interfaces/IRequest";
import {SearchParams} from "../../request/parameters/Search";
import {TicketIssueParams} from "../../request/parameters/TicketIssue";

import {AbstractParamsValidator} from "../../request/AbstractParamsValidator";
import {TicketMeRequest} from "./TicketMeRequest";

import {SearchMessageMapper} from "./mappers/SearchMessageMapper";
import {DEFAULT_CURRENCY, DEFAULT_LANG} from "./config/defaults";

export class TicketMeRequestManager implements IRequestManager {
    constructor(
        public readonly endpointManager: IEndpointManager,
        public readonly conversionStrategy: IConversionStrategy,
        public readonly requestOptionsManager: IRequestOptionsManager) {
    }

    public extraConfiguration = {
        party: {agencyId: ''},
        currency: DEFAULT_CURRENCY,
        lang: DEFAULT_LANG
    }

    createAuthRequest(params: { login: string; password: string; structureId: string }): IRequest {
        throw new MethodNotImplemented('auth')
    }

    createBookRequest(params: BookParams): IRequest {
        return undefined;
    }

    createFareRulesRequest(params: PriceParams): IRequest {
        return undefined;
    }

    createOrderCancelRequest(params: OrderRetrieveParams): IRequest {
        return undefined;
    }

    createOrderRetrieveRequest(params: OrderRetrieveParams): IRequest {
        return undefined;
    }

    createPriceRequest(params: PriceParams): IRequest {
        return undefined;
    }

    createRefundCalculationRequest(params: OrderRetrieveParams): IRequest {
        return undefined;
    }

    createRefundRequest(params: RefundParams): IRequest {
        return undefined;
    }

    createSearchRequest(params: SearchParams): IRequest {
        return this.createRequest(params,
            {
                mapper: new SearchMessageMapper(params, this.extraConfiguration.party)
            })
    }

    createServiceListRequest(params: PriceParams): IRequest {
        return undefined;
    }

    createTicketIssueRequest(params: TicketIssueParams): IRequest {
        return undefined;
    }

    createRequest(requestParams: object, services: {
        mapper: IMessageMapper,
        validator?: AbstractParamsValidator
    }): TicketMeRequest {
        assert(this.extraConfiguration.party.agencyId.length > 0, 'No agency ID provided!')

        // run specific ticketme validation
        if (services.validator) {
            services.validator.validate(requestParams)
        }

        // map to ticketme message
        const rq = services.mapper.map()

        // @todo add currency info - optional
        return new TicketMeRequest(rq,
            this.requestOptionsManager.create({endpoint: this.endpointManager.getEndpointForMessage(rq)}),
            this.conversionStrategy)
    }
}