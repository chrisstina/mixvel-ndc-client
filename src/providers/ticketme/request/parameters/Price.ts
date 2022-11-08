import {IsArray, IsIn, IsString, Length, ValidateNested} from "class-validator";
import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {OfferItem, PriceProps} from "../../../../core/request/parameters/Price";
import {PaxCategory} from "../../../../core/request/types";
import {Result} from "../../../../core/Result";

class TicketMeOfferItem extends OfferItem {
    @IsIn(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ptc?: PaxCategory
    @IsString()
    paxs?: string
}

export class TicketMeOffer {
    @IsString()
    @Length(1)
    public readonly offerId: string
    @ValidateNested()
    public offerItems: OfferItem[]
    @IsString()
    @Length(1)
    public readonly offerOwner?: string
    @IsString()
    @Length(1)
    public readonly responseId?: string

    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string) {
        this.offerId = offerId;
        this.offerOwner = offerOwner;
        this.responseId = responseId;
        this.offerItems = offerItems.map(item => new TicketMeOfferItem(item.offerItemId, item.ptc, item.paxs))
    }
}

export class TicketMePriceParams extends AbstractRequestParams {
    @IsArray()
    @ValidateNested()
    public readonly offers: TicketMeOffer[]

    public static create(props: PriceProps): Result<TicketMePriceParams> {
        const params = new TicketMePriceParams(props);
        return AbstractRequestParams.validate<TicketMePriceParams>(params);
    }

    private constructor(props: PriceProps) {
        super()
        this.offers = props.offers.map(offerData => new TicketMeOffer(offerData.offerId, offerData.offerItems, offerData.offerOwner, offerData.responseId))
    }
}