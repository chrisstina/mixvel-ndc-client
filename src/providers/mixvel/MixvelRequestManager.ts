import {IRequest} from "../../interfaces/IRequest";
import {IRequestManager} from "../../interfaces/IRequestManager";
import {IEndpointManager} from "../../interfaces/IEndpointManager";
import {IRequestOptionsManager} from "../../interfaces/IRequestOptionsManager";
import {IMessageMapper} from "../../interfaces/IMessageMapper";
import {INDCMessage} from "../../interfaces/INDCMessage";

import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {FirstAvailableEmailService} from "../../services/FirstAvailableEmailService";

import {MixvelRequest} from "./MixvelRequest";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

import {Result} from "../../core/Result";
import {isPriceParams} from "../../core/request/typeguards";
import {SearchParams} from "../../core/request/parameters/Search";
import {PriceParams} from "../../core/request/parameters/Price";
import {BookParams} from "../../core/request/parameters/Book";
import {TicketIssueParams} from "../../core/request/parameters/TicketIssue";
import {RefundParams} from "../../core/request/parameters/Refund";
import {OrderRetrieveParams} from "../../core/request/parameters/OrderRetrieve";
import {RepriceParams} from "../../core/request/parameters/Reprice";

import {MixvelBookParams} from "./request/parameters/Book";

import {BookParamsValidator} from "./validators/BookParamsValidator";

import {SearchMessageMapper} from "./mappers/SearchMessageMapper";
import {BookMessageMapper} from "./mappers/BookMessageMapper";
import {IssueOrderMessageMapper} from "./mappers/IssueOrderMessageMapper";
import {RefundOrderMessageMapper} from "./mappers/RefundOrderMessageMapper";

import {Mixvel_OfferPriceRQ} from "./messages/Mixvel_OfferPriceRQ";
import {Mixvel_OrderRetrieveRQ} from "./messages/Mixvel_OrderRetrieveRQ";
import {Mixvel_OrderCancelRQ} from "./messages/Mixvel_OrderCancelRQ";
import {Mixvel_OrderReshopRQ} from "./messages/Mixvel_OrderReshopRQ";
import {Mixvel_OrderRulesRQ} from "./messages/Mixvel_OrderRulesRQ";
import {MethodNotImplemented} from "../../core/errors/MethodNotImplemented";
import {ServiceListMessageMapper} from "./mappers/ServiceListMessageMapper";
import {OrderSplitParams} from "../../core/request/parameters/OrderSplit";
import {SplitOrderMessageMapper} from "./mappers/SplitOrderMessageMapper";

export class MixvelRequestManager implements IRequestManager {
    constructor(
        readonly endpointManager: IEndpointManager,
        public conversionStrategy: IConversionStrategy,
        public requestOptionsManager: IRequestOptionsManager) {
    }

    public extraConfiguration = {} // no extra config here

    private static prepareBookParams(params: BookParams) {
        const {passengers} = params
        passengers.forEach((passenger) => {
            if (!passenger.contacts.email) {
                passenger.contacts.email = FirstAvailableEmailService.getFirstAvailableEmail(params)
            }
        })
        return params as MixvelBookParams
    }

    createAuthRequest(params: { login: string, password: string, structureId: string }): Result<IRequest> {
        return Result.ok(new MixvelRequest(
            new MixvelAuthAppData(params.login, params.password, params.structureId),
            this.requestOptionsManager.create({endpoint: this.endpointManager.getEndpointByKey('auth')}),
            this.conversionStrategy))
    }

    createSearchRequest(params: SearchParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: new SearchMessageMapper(params)
        }))
    }

    createPriceRequest(params: PriceParams): Result<IRequest> {
        const restructuredParams = params.asPlain();
        return Result.ok(this.createRequest(params, {
            mapper: {
                map(): INDCMessage {
                    return new Mixvel_OfferPriceRQ(restructuredParams.offerId, restructuredParams.offerItemIds)
                }
            }
        }))
    }

    createRepriceRequest(params: RepriceParams): Result<IRequest> {
        return Result.fail(new MethodNotImplemented('reprice').message)
    }

    createBookRequest(params: BookParams): Result<IRequest> {
        const restructuredParams = MixvelRequestManager.prepareBookParams(params)
        const validationError = BookParamsValidator.validate(restructuredParams)
        if (typeof validationError === "string") {
            return Result.fail<IRequest>(validationError)
        }

        return Result.ok(this.createRequest(params, {
            mapper: new BookMessageMapper(restructuredParams)
        }))
    }

    createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: {
                map(): INDCMessage {
                    return new Mixvel_OrderRetrieveRQ(params.orderId)
                }
            }
        }))
    }

    createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: {
                map(): INDCMessage {
                    return new Mixvel_OrderCancelRQ(params.orderId)
                }
            }
        }))
    }

    createTicketIssueRequest(params: TicketIssueParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: new IssueOrderMessageMapper(params), // @todo add specific validation
        }))
    }

    createRefundCalculationRequest(params: OrderRetrieveParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: {
                map(): INDCMessage {
                    return new Mixvel_OrderReshopRQ(params.orderId)
                }
            }
        }))
    }

    createRefundRequest(params: RefundParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: new RefundOrderMessageMapper(params),
        }))
    }

    createFareRulesRequest(params: PriceParams | OrderRetrieveParams): Result<IRequest> {
        if (isPriceParams(params)) {
            const restructuredParams = params.asPlain();
            return Result.ok(this.createRequest(params, {
                mapper: {
                    map(): INDCMessage {
                        return new Mixvel_OrderRulesRQ(restructuredParams.offerId, restructuredParams.offerItemIds)
                    }
                }
            }))
        }
        return Result.ok(this.createRequest(params, {
            mapper: {
                map(): INDCMessage {
                    return new Mixvel_OrderRulesRQ(params.orderId)
                }
            }
        }))
    }

    createServiceListRequest(params: PriceParams|OrderRetrieveParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: new ServiceListMessageMapper(params)
        }))
    }

    createOrderSplitRequest(params: OrderSplitParams): Result<IRequest> {
        return Result.ok(this.createRequest(params, {
            mapper: new SplitOrderMessageMapper(params)
        }))
    }

    createRequest(requestParams: object, services: {
        mapper: IMessageMapper,
    }): IRequest {
        const rq = services.mapper.map() // map to mixvel message
        return new MixvelRequest(
            new MixvelAppData<typeof rq>(rq),
            this.requestOptionsManager.create({endpoint: this.endpointManager.getEndpointForMessage(rq)}),
            this.conversionStrategy)
    }
}