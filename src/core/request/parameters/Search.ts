import {
    ArrayNotEmpty,
    IsAlpha,
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
    MinDate,
    ValidateNested,
} from "class-validator";

import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Cabin, PaxCategory, PricingOption} from "../types";
import {Result} from "../../Result";

export class OriginDestination {
  @IsAlpha()
  @Length(3, 3)
  public from: string;
  @IsAlpha()
  @Length(3, 3)
  public to: string;
  @MinDate(new Date())
  public dateRangeStart: Date;
  @MinDate(new Date())
  public dateRangeEnd: Date;

  constructor(
    from: string,
    to: string,
    dateRangeStart: Date,
    dateRangeEnd: Date
  ) {
    this.from = from;
    this.to = to;
    this.dateRangeStart = dateRangeStart;
    this.dateRangeEnd = dateRangeEnd;
  }
}

class AnonymousTraveler {
  @IsString()
  public readonly id: string;
  @IsIn([
    "ADULT",
    "CHILD",
    "INFANT",
    "WSEATINFANT",
    "YOUTH",
    "SENIOR",
    "DISABLED",
    "DISABLEDCHILD",
    "ESCORT",
    "LARGEFAMILY",
    "STATERESIDENT",
  ])
  public readonly ptc: PaxCategory;
  @IsNumber()
  @Min(0)
  @Max(100)
  public readonly age: number;

  constructor(id: string, ptc: PaxCategory, age: number) {
    this.id = id;
    this.ptc = ptc;
    this.age = age;
  }
}

export type Contract3D = {
  clientCode: string;
  agencyCode?: string;
  contractType?: string;
  discountPercent?: number;
};

/**
 * @typedef SearchProps
 * @property {Array} originDestinations
 * @property {Array} travelers
 * @property {Cabin} cabin
 * @property {Array} preferredCarriers
 */
export type SearchProps = RequestProps<SearchParams>;

export class SearchParams extends AbstractRequestParams {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  public originDestinations: OriginDestination[];
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  public readonly travelers: AnonymousTraveler[];
  public readonly cabin: Cabin;
  @IsOptional()
  @ArrayNotEmpty()
  public readonly preferredCarriers?: string[];
  @IsBoolean()
  @IsOptional()
  public readonly onlyDirect?: boolean = false;
  @IsOptional()
  @IsIn(["LOWEST_FARE", "ALL_FARES"])
  public readonly pricingOption?: PricingOption;
  @IsOptional()
  public readonly contract3D?: Contract3D;
  @IsOptional()
  public readonly preferredRBD?: string[];

  private constructor(props: SearchProps) {
    super();
    this.originDestinations = props.originDestinations.map(
      ({ from, to, dateRangeEnd, dateRangeStart }) =>
        new OriginDestination(from, to, dateRangeStart, dateRangeEnd)
    );
    this.travelers = props.travelers.map(
      ({ id, ptc, age }) => new AnonymousTraveler(id, ptc, age)
    );
    this.cabin = props.cabin;
    this.preferredCarriers = props.preferredCarriers;
    if (props.onlyDirect) {
      this.onlyDirect = props.onlyDirect;
    }
    if (props.pricingOption) {
      this.pricingOption = props.pricingOption;
    }
    if (props.contract3D) {
      this.contract3D = props.contract3D;
    }
    if (props.preferredRBD) {
      this.preferredRBD = props.preferredRBD;
    }
  }

  public static create(props: SearchProps): Result<SearchParams> {
    const params = new SearchParams(props);
    return AbstractRequestParams.validate<SearchParams>(params);
  }
}
