import {ValidateNested} from "class-validator";
import {AbstractRequestParams} from "../../../../core/request/parameters/AbstractRequestParams";
import {BookProps} from "../../../../core/request/parameters/Book";
import {TicketMeOffer} from "./Price";
import {Result} from "../../../../core/Result";

export class TicketMeBookParams extends AbstractRequestParams {
    @ValidateNested({each: true})
    public offer: TicketMeOffer

    public static create(props: BookProps): Result<TicketMeBookParams> {
        const params = new TicketMeBookParams(props);
        return AbstractRequestParams.validate<TicketMeBookParams>(params);
    }

    private constructor(props: BookProps) {
        super()
        this.offer = new TicketMeOffer(props.offer.offerId, props.offer.offerItems, props.offer.offerOwner || '', props.offer.responseId || '')
    }
}