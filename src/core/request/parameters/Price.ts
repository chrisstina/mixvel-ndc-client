import {IsArray, IsString} from "class-validator";
import {AbstractParams} from "./AbstractParams";

export type PriceProps = {
    offerId: string
    offerItemIds: string[]
}

export class PriceParams extends AbstractParams {
    @IsString()
    public readonly offerId: string
    @IsArray()
    @IsString({
        each: true
    })
    public readonly offerItemIds: string[]

    private constructor(props: PriceProps) {
        super()
        this.offerId = props.offerId
        this.offerItemIds = props.offerItemIds
    }
}