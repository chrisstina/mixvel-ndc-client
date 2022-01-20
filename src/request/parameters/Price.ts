import {IsArray, IsString} from "class-validator";
import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";

const validationService = new RequestValidationService()

export type PriceProps = {
    offerId: string
    offerItemIds: string[]
}

export class PriceParams {
    @IsString()
    public readonly offerId: string
    @IsArray()
    @IsString({
        each: true
    })
    public readonly offerItemIds: string[]

    private constructor(props: PriceProps) {
        this.offerId = props.offerId
        this.offerItemIds = props.offerItemIds
    }

    public static create(props: PriceProps): Result<PriceParams> {
        const params = new PriceParams(props)
        const validationErrors = validationService.getValidator<PriceParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<PriceParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<PriceParams>(params)
    }
}