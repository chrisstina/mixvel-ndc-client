import {IsIn, IsPositive, IsString, ValidateNested} from "class-validator";
import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";
import {FopType} from "../types";

const validationService = new RequestValidationService()

class FormOfPayment {
    @IsIn(["CASH", "BILL", "CARD"])
    public type: FopType
    public data?: string | {}

    constructor(type: FopType, data?: string | {}) {
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

export type TicketIssueProps = {
    orderId: string
    payment: { amount: number, currency: string }
    formOfPayment: { type: FopType, data?: string | {} }
}

export class TicketIssueParams {
    @IsString()
    orderId: string
    @ValidateNested()
    payment: Payment
    @ValidateNested()
    formOfPayment: FormOfPayment

    private constructor(props: TicketIssueProps) {
        this.orderId = props.orderId
        this.formOfPayment = new FormOfPayment(props.formOfPayment.type, props.formOfPayment.data)
        this.payment = new Payment(props.payment.amount, props.payment.currency)
    }

    public static create(props: TicketIssueProps): Result<TicketIssueParams> {
        const params = new TicketIssueParams(props)
        const validationErrors = validationService.getValidator<TicketIssueParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<TicketIssueParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<TicketIssueParams>(params)
    }
}