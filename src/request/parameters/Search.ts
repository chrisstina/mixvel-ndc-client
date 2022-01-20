import {
    ArrayNotEmpty,
    IsAlpha,
    IsAlphanumeric,
    IsIn,
    IsNumber,
    Length,
    Max,
    Min,
    MinDate,
    ValidateNested
} from "class-validator";
import {Result} from "../../core/Result";
import {RequestValidationService} from "../../services/RequestValidationService";

import {Cabin, PaxCategory} from "../types";

const validationService = new RequestValidationService()

export class OriginDestination {
    @IsAlpha()
    @Length(3, 3)
    public from: string
    @IsAlpha()
    @Length(3, 3)
    public to: string
    @MinDate(new Date())
    public dateRangeStart: Date
    @MinDate(new Date())
    public dateRangeEnd: Date

    constructor(from: string,
                to: string,
                dateRangeStart: Date,
                dateRangeEnd: Date
    ) {
        this.from = from
        this.to = to
        this.dateRangeStart = dateRangeStart
        this.dateRangeEnd = dateRangeEnd
    }
}

class AnonymousTraveler {
    @IsAlphanumeric()
    public readonly id: string
    @IsIn(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    public readonly ptc: PaxCategory
    @IsNumber()
    @Min(0)
    @Max(100)
    public readonly age: number

    constructor(id: string, ptc: PaxCategory, age: number) {
        this.id = id
        this.ptc = ptc
        this.age = age
    }
}

/**
 * @typedef SearchProps
 * @property {Array} originDestinations
 * @property {Array} travelers
 * @property {Cabin} cabin
 * @property {Array} preferredCarriers
 */
export type SearchProps = {
    originDestinations: OriginDestination[],
    travelers: AnonymousTraveler[],
    cabin: Cabin,
    preferredCarriers: string[] | null
}

export class SearchParams {
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    public originDestinations: OriginDestination[]
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    public readonly travelers: AnonymousTraveler[]
    public readonly cabin: Cabin
    public readonly preferredCarriers: string[] | null

    private constructor(props: SearchProps) {
        this.originDestinations = props.originDestinations.map(({
                                                                    from,
                                                                    to,
                                                                    dateRangeEnd,
                                                                    dateRangeStart
                                                                }) => new OriginDestination(from, to, dateRangeStart, dateRangeEnd))
        this.travelers = props.travelers.map(({id, ptc, age}) => new AnonymousTraveler(id, ptc, age));
        this.cabin = props.cabin;
        this.preferredCarriers = props.preferredCarriers;
    }

    public static create(props: SearchProps): Result<SearchParams> {
        const params = new SearchParams(props)
        const validationErrors = validationService.getValidator<SearchParams>().validate(params)
        if (validationErrors.length > 0) {
            return Result.fail<SearchParams>(validationService.collectValidationErrors(validationErrors).join(', '))
        }
        return Result.ok<SearchParams>(params)
    }
}