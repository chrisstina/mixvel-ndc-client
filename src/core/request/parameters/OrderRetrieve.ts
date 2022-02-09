import {IsString} from "class-validator";

import {AbstractParams} from "./AbstractParams";

export type OrderRetrieveProps = {
    orderId: string
}

export class OrderRetrieveParams extends AbstractParams {
    @IsString()
    public readonly orderId: string

    private constructor(props: OrderRetrieveProps) {
        super()
        this.orderId = props.orderId
    }
}