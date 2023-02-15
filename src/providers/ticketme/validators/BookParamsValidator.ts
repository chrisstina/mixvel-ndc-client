import {BookParams} from "../../../core/request/parameters/Book";
import {AbstractParamsValidator} from "../../../core/request/AbstractParamsValidator";
import {TicketMeBookParams} from "../request/parameters/Book";

export class BookParamsValidator extends AbstractParamsValidator {
  public static validate(params: BookParams): null | string {
    const paramsOrError = TicketMeBookParams.create(params);
    if (paramsOrError.isFailure) {
      return paramsOrError.error || "Generic parameter validation error";
    }
    return null;
  }
}
