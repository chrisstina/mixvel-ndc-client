import {AbstractParams} from "./AbstractParams";
import {IsArray, IsOptional, IsString, Length, ValidateNested} from "class-validator";

class Offer {
    @IsString()
    @Length(1)
    public readonly offerId: string
    public readonly offerItems: OfferItem[]
    @IsOptional()
    @IsString()
    @Length(1)
    public readonly offerOwner?: string
    @IsOptional()
    @IsString()
    @Length(1)
    public readonly responseId?: string

    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string) {
        this.offerId = offerId;
        this.offerItems = offerItems;
        this.offerOwner = offerOwner;
        this.responseId = responseId;
    }
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
    @ValidateNested()
    public readonly offers: Offer[]

    private constructor(props: PriceProps) {
        super()
        this.offers = props.offers.map(offerData => new Offer(offerData.offerId, offerData.offerItems, offerData.offerOwner, offerData.responseId))
    }
}