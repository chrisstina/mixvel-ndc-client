import {IsString} from "class-validator";

import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";

const validationService = new RequestValidationService()

export type OrderRetrieveProps = {
    orderId: string
}

export class OrderRetrieveParams {
    @IsString()
    public readonly orderId: string

    private constructor(props: OrderRetrieveProps) {
        this.orderId = props.orderId
    }

    public static create(props: OrderRetrieveProps): Result<OrderRetrieveParams> {
        const params = new OrderRetrieveParams(props)
        const validationErrors = validationService.getValidator<OrderRetrieveParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<OrderRetrieveParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<OrderRetrieveParams>(params)
    }
}