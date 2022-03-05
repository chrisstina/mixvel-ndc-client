import {IsString} from "class-validator";

import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";

export type RepriceProps = RequestProps<RepriceParams>

export class RepriceParams extends AbstractRequestParams {
    @IsString()
    public readonly orderId: string

    private constructor(props: RepriceProps) {
        super()
        this.orderId = props.orderId
    }
}