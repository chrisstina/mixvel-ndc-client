import {IsIn, IsPositive, IsString, ValidateNested} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {FopType} from "../types";

class FormOfPayment {
    @IsIn(["CASH", "BILL", "CARD"])
    public type: FopType
    public data?: string | Record<string, unknown>

    constructor(type: FopType, data?: string | Record<string, unknown>) {
        this.data = data
        this.type = type
    }
}

class Payment {
    @IsPositive()
    amount: number
    @IsString()
    currency: string

    constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
    }
}

export type TicketIssueProps = RequestProps<TicketIssueParams>

export class TicketIssueParams extends AbstractRequestParams {
    @IsString()
    orderId: string
    @ValidateNested()
    payment: Payment
    @ValidateNested()
    formOfPayment: FormOfPayment

    private constructor(props: TicketIssueProps) {
        super()
        this.orderId = props.orderId
        this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data)
        this.payment = new Payment(props.payment.amount, props.payment.currency)
    }
}