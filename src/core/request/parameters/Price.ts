import {AbstractParams} from "./AbstractParams";
import {IsArray} from "class-validator";

type Offer = {
    offerId: string,
    offerItems: OfferItem[],
    offerOwner?: string,
    responseId?: string
}

type OfferItem = {
    offerItemId: string,
    paxs?: string
}

export type PriceProps = {
    offers: Offer[],
}

export class PriceParams extends AbstractParams {
    @IsArray()
    public readonly offers: Offer[]

    private constructor(props: PriceProps) {
        super()
        this.offers = props.offers
    }
}