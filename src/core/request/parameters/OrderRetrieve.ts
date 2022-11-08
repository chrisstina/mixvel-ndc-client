import {IsOptional, IsString} from "class-validator";

import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export type OrderRetrieveProps = RequestProps<OrderRetrieveParams>

export class OrderRetrieveParams extends AbstractRequestParams {
    @IsString()
    public readonly orderId: string
    @IsString()
    @IsOptional()
    public readonly offerOwner?: string

    public static create(props: OrderRetrieveProps): Result<OrderRetrieveParams> {
        const params = new OrderRetrieveParams(props);
        return AbstractRequestParams.validate<OrderRetrieveParams>(params);
    }

    private constructor(props: OrderRetrieveProps) {
        super()
        this.orderId = props.orderId
        this.offerOwner = props.offerOwner
    }
}