import {AbstractParamsValidator} from "../../../core/request/AbstractParamsValidator";
import {TicketIssueParams} from "../../../core/request/parameters/TicketIssue";

export declare class TicketIssueParamsValidator extends AbstractParamsValidator {
    static validate(params: TicketIssueParams): null | string;
}
