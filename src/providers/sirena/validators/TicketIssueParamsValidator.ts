import { AbstractParamsValidator } from "../../../core/request/AbstractParamsValidator";
import { TicketIssueParams } from "../../../core/request/parameters/TicketIssue";
import { SirenaTicketIssueParams } from "../request/parameters/TicketIssue";

export class TicketIssueParamsValidator extends AbstractParamsValidator {
  public static validate(params: TicketIssueParams): null | string {
    const paramsOrError = SirenaTicketIssueParams.create(params);
    if (paramsOrError.isFailure) {
      return paramsOrError.error || "Generic parameter validation error";
    }
    return null;
  }
}
