import { Result } from "../../core/Result";
import { MethodNotImplemented } from "../../core/errors/MethodNotImplemented";

import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";

import { IRequest } from "../../interfaces/IRequest";
import { IRequestManager } from "../../interfaces/IRequestManager";
import { IMessageMapper } from "../../interfaces/IMessageMapper";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
import { IRequestOptionsManager } from "../../interfaces/IRequestOptionsManager";

import { AbstractRequestParams } from "../../core/request/parameters/AbstractRequestParams";
import { BookParams } from "../../core/request/parameters/Book";
import { PriceParams } from "../../core/request/parameters/Price";
import { OrderRetrieveParams } from "../../core/request/parameters/OrderRetrieve";
import { RefundParams } from "../../core/request/parameters/Refund";
import { SearchParams } from "../../core/request/parameters/Search";
import { TicketIssueParams } from "../../core/request/parameters/TicketIssue";
import { RepriceParams } from "../../core/request/parameters/Reprice";

import { TicketMeRequest } from "./TicketMeRequest";

import { SearchMessageMapper } from "./mappers/SearchMessageMapper";
import { PriceMessageMapper } from "./mappers/PriceMessageMapper";
import { BookMessageMapper } from "./mappers/BookMessageMapper";
import { OrderRetrieveMessageMapper } from "./mappers/OrderRetrieveMessageMapper";
import { RepriceMessageMapper } from "./mappers/RepriceMessageMapper";
import { OrderCancelMessageMapper } from "./mappers/OrderCancelMessageMapper";

import { DEFAULT_CURRENCY, DEFAULT_LANG } from "./config/defaults";
import { BookParamsValidator } from "./validators/BookParamsValidator";
import { PriceParamsValidator } from "./validators/PriceParamsValidator";
import { IssueTicketMessageMapper } from "./mappers/IssueTicketMessageMapper";
import { TicketIssueParamsValidator } from "./validators/TicketIssueParamsValidator";
import { OrderSplitParams } from "../../core/request/parameters/OrderSplit";
import { OrderChangeParams } from "../../core/request/parameters/OrderChange";
import { AirlineProfileParams } from "../../core/request/parameters/AirlineProfile";

export class TicketMeRequestManager implements IRequestManager {
  public extraConfiguration = {
    party: { agencyId: "" },
    currency: DEFAULT_CURRENCY,
    lang: DEFAULT_LANG,
  };

  constructor(
    public readonly endpointManager: IEndpointManager,
    public readonly conversionStrategy: IConversionStrategy,
    public readonly requestOptionsManager: IRequestOptionsManager
  ) {}

  createAuthRequest(params: {
    login: string;
    password: string;
    structureId: string;
  }): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("auth").message);
  }

  createBookRequest(params: BookParams): Result<IRequest> {
    const validationError =
      this.validateRequest() || BookParamsValidator.validate(params);
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }

    return this.createRequest(params, {
      mapper: new BookMessageMapper(params, this.extraConfiguration.party),
    });
  }

  createFareRulesRequest(params: PriceParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("rules").message);
  }

  createOrderCancelRequest(params: OrderRetrieveParams): Result<IRequest> {
    const validationError = this.validateRequest();
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }
    return this.createRequest(params, {
      mapper: new OrderCancelMessageMapper(
        params,
        this.extraConfiguration.party
      ),
    });
  }

  createOrderRetrieveRequest(params: OrderRetrieveParams): Result<IRequest> {
    const validationError = this.validateRequest();
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }
    return this.createRequest(params, {
      mapper: new OrderRetrieveMessageMapper(
        params,
        this.extraConfiguration.party
      ),
    });
  }

  createPriceRequest(params: PriceParams): Result<IRequest> {
    const validationError =
      this.validateRequest() || PriceParamsValidator.validate(params);
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }
    return this.createRequest(params, {
      mapper: new PriceMessageMapper(params, this.extraConfiguration.party),
    });
  }

  createRefundCalculationRequest(
    params: OrderRetrieveParams
  ): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("refund calc").message);
  }

  createRefundRequest(params: RefundParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("refund").message);
  }

  createSearchRequest(params: SearchParams): Result<IRequest> {
    const validationError = this.validateRequest();
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }

    return this.createRequest(params, {
      mapper: new SearchMessageMapper(params, this.extraConfiguration.party),
    });
  }

  createServiceListRequest(params: PriceParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("service list").message);
  }

  createServiceAddRequest(params: OrderChangeParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("add service").message);
  }

  createTicketIssueRequest(params: TicketIssueParams): Result<IRequest> {
    const validationError =
      this.validateRequest() || TicketIssueParamsValidator.validate(params);
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }

    return this.createRequest(params, {
      mapper: new IssueTicketMessageMapper(
        params,
        this.extraConfiguration.party
      ),
    });
  }

  createRepriceRequest(params: RepriceParams): Result<IRequest> {
    const validationError = this.validateRequest();
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }

    return this.createRequest(params, {
      mapper: new RepriceMessageMapper(params, this.extraConfiguration.party),
    });
  }

  createOrderSplitRequest(params: OrderSplitParams): Result<IRequest> {
    throw new Error("not implemented");
  }

  createAirlineProfileRequest(value: AirlineProfileParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("airline profile").message);
  }

  validateRequest(): string | null {
    if (
      !this.extraConfiguration.party.agencyId ||
      this.extraConfiguration.party.agencyId.length === 0
    ) {
      return "No agency ID provided! Use setProviderConfig to set it.";
    }
    return null;
  }

  createRequest(
    requestParams: AbstractRequestParams,
    services: {
      mapper: IMessageMapper;
    }
  ): Result<IRequest> {
    // @todo add currency info - optional
    const rq = services.mapper.map();
    return Result.ok(
      new TicketMeRequest(
        rq,
        this.requestOptionsManager.create({
          endpoint: this.endpointManager.getEndpointForMessage(rq),
        }),
        this.conversionStrategy
      )
    );
  }
}
