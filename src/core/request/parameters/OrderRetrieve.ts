import {IsOptional, IsString} from "class-validator";

import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";

export type OrderRetrieveProps = RequestProps<OrderRetrieveParams>

export class OrderRetrieveParams extends AbstractRequestParams {
    @IsString()
    public readonly orderId: string
    @IsString()
    @IsOptional()
    public readonly offerOwner?: string

    private constructor(props: OrderRetrieveProps) {
        super()
        this.orderId = props.orderId
        this.offerOwner = props.offerOwner
    }
}