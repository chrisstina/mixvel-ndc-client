import {IsString} from "class-validator";
import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export type RefundProps = RequestProps<RefundParams>

export class RefundParams extends AbstractRequestParams {
    @IsString()
    public readonly orderId: string
    public readonly orderItemIds: string[][]

    public static create(props: RefundProps): Result<RefundParams> {
        const params = new RefundParams(props);
        return AbstractRequestParams.validate<RefundParams>(params);
    }

    private constructor(props: RefundProps) {
        super()
        this.orderId = props.orderId
        this.orderItemIds = props.orderItemIds
    }
}