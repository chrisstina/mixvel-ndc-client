import {IsString} from "class-validator";
import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";

const validationService = new RequestValidationService()

export type RefundProps = {
    orderId: string,
    orderItemIds: string[][]
}

export class RefundParams {
    @IsString()
    public readonly orderId: string
    public readonly orderItemIds: string[][]

    private constructor(props: RefundProps) {
        this.orderId = props.orderId
        this.orderItemIds = props.orderItemIds
    }

    public static create(props: RefundProps): Result<RefundParams> {
        const params = new RefundParams(props)
        const validationErrors = validationService.getValidator<RefundParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<RefundParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<RefundParams>(params)
    }
}