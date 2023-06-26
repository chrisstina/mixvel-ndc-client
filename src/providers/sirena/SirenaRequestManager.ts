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
import { OrderSplitParams } from "../../core/request/parameters/OrderSplit";

import { BookParamsValidator } from "../ticketme/validators/BookParamsValidator";

import { SearchMessageMapper } from "./mappers/SearchMessageMapper";
import { PriceMessageMapper } from "./mappers/PriceMessageMapper";
import { BookMessageMapper } from "./mappers/BookMessageMapper";
import { OrderRetrieveMessageMapper } from "./mappers/OrderRetrieveMessageMapper";
import { OrderCancelMessageMapper } from "./mappers/OrderCancelMessageMapper";
import { IssueTicketMessageMapper } from "./mappers/IssueTicketMessageMapper";
import { ServiceListMessageMapper } from "./mappers/ServiceListMessageMapper";
import { PriceParamsValidator } from "./validators/PriceParamsValidator";
import { TicketIssueParamsValidator } from "./validators/TicketIssueParamsValidator";
import { SirenaTicketIssueParams } from "./request/parameters/TicketIssue";
import { DEFAULT_CURRENCY, DEFAULT_LANG } from "./config/defaults";
import { SirenaRequest } from "./SirenaRequest";

export class SirenaRequestManager implements IRequestManager {
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
    const validationError =
      this.validateRequest() || PriceParamsValidator.validate(params);
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }
    return this.createRequest(params, {
      mapper: new ServiceListMessageMapper(
        params,
        this.extraConfiguration.party
      ),
    });
  }

  createTicketIssueRequest(params: TicketIssueParams): Result<IRequest> {
    const validationError =
      this.validateRequest() || TicketIssueParamsValidator.validate(params);
    if (typeof validationError === "string") {
      return Result.fail<IRequest>(validationError);
    }

    return this.createRequest(params, {
      mapper: new IssueTicketMessageMapper(
        params as SirenaTicketIssueParams,
        this.extraConfiguration.party
      ),
    });
  }

  createRepriceRequest(params: RepriceParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("reprice").message);
  }

  createOrderSplitRequest(params: OrderSplitParams): Result<IRequest> {
    return Result.fail(new MethodNotImplemented("split").message);
  }

  validateRequest(): string | null {
    return null;
  }

  createRequest(
    requestParams: AbstractRequestParams,
    services: {
      mapper: IMessageMapper;
    }
  ): Result<IRequest> {
    const rq = services.mapper.map();
    return Result.ok(
      new SirenaRequest(
        rq,
        this.requestOptionsManager.create({
          endpoint: this.endpointManager.getEndpointForMessage(rq),
        }),
        this.conversionStrategy
      )
    );
  }
}
