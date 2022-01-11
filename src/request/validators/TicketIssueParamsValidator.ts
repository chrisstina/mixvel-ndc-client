import {AbstractParamsValidator} from "./AbstractParamsValidator";
import {TicketIssueParams} from "../parameters";

export class TicketIssueParamsValidator extends AbstractParamsValidator {
    public static validate(props: TicketIssueParams) : true | never {
        const {orderId, formOfPayment, payment} = props
        //@todo
        return true
    }
}