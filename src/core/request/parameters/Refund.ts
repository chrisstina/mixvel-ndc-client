import {IsString} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";

export type RefundProps = RequestProps<RefundParams>

export class RefundParams extends AbstractRequestParams {
    @IsString()
    public readonly orderId: string
    public readonly orderItemIds: string[][]

    private constructor(props: RefundProps) {
        super()
        this.orderId = props.orderId
        this.orderItemIds = props.orderItemIds
    }
}