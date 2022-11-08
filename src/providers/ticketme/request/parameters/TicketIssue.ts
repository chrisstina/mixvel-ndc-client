import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {IsIn, IsString, MinLength, ValidateNested} from "class-validator";
import {Payment, TicketIssueProps} from "../../../../core/request/parameters/TicketIssue";
import {FopType} from "../../../../core/request/types";
import {Result} from "../../../../core/Result";

class TicketMeFormOfPayment {
    @IsIn(["CASH", "CARD", "OTHER"])
    public type: FopType
    public data?: string | Record<string, unknown>

    constructor(type: FopType, data?: string | Record<string, unknown>) {
        this.data = data
        this.type = type
    }
}

export class TicketMeTicketIssueParams extends AbstractRequestParams {
    @IsString()
    @MinLength(1)
    orderId: string
    @IsString()
    @MinLength(1)
    orderOwner?: string
    @ValidateNested()
    payment: Payment
    @ValidateNested()
    formOfPayment: TicketMeFormOfPayment
    @MinLength(1, {
        each: true,
    })
    paxs?: string[]

    public static create(props: TicketIssueProps): Result<TicketMeTicketIssueParams> {
        const params = new TicketMeTicketIssueParams(props);
        return AbstractRequestParams.validate<TicketMeTicketIssueParams>(params);
    }

    private constructor(props: TicketIssueProps) {
        super()
        this.orderId = props.orderId
        this.formOfPayment = new TicketMeFormOfPayment(props.formOfPayment.type, props.formOfPayment.data)
        this.payment = new Payment(props.payment.amount, props.payment.currency)
        this.orderOwner = props.orderOwner || ''
        this.paxs = props.paxs
    }
}