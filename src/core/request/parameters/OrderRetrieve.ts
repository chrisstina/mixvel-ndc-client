import {IsOptional, IsString} from "class-validator";

import {AbstractParams} from "./AbstractParams";

export type OrderRetrieveProps = {
    orderId: string,
    offerOwner?: string
}

export class OrderRetrieveParams extends AbstractParams {
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