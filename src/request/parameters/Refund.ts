import {IsString} from "class-validator";
import {AbstractParams} from "./AbstractParams";

export type RefundProps = {
    orderId: string,
    orderItemIds: string[][]
}

export class RefundParams extends AbstractParams {
    @IsString()
    public readonly orderId: string
    public readonly orderItemIds: string[][]

    private constructor(props: RefundProps) {
        super()
        this.orderId = props.orderId
        this.orderItemIds = props.orderItemIds
    }
}