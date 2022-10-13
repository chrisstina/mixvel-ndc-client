import {IsIn, IsOptional, IsPositive, IsString, ValidateNested} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {FopType} from "../types";

export class FormOfPayment {
    @IsIn(["CASH", "BILL", "CARD"])
    public type: FopType
    public data?: string | Record<string, unknown> //@todo check data for BILL FOP must be string

    constructor(type: FopType, data?: string | Record<string, unknown>) {
        this.data = data
        this.type = type
    }
}

export class Payment {
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
    @IsOptional()
    orderOwner?: string
    @IsOptional()
    paxs?: string[]

    private constructor(props: TicketIssueProps) {
        super()
        this.orderId = props.orderId
        this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data)
        this.payment = new Payment(props.payment.amount, props.payment.currency)
        this.orderOwner = props.orderOwner
        this.paxs = props.paxs
    }
}