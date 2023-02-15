import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {IsArray, IsIn, IsOptional, IsString, Length, ValidateNested,} from "class-validator";
import {PaxCategory} from "../types";
import {Result} from "../../Result";

export class OfferItem {
  @IsString()
  offerItemId: string;
  @IsOptional()
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
  ptc?: PaxCategory;
  @IsOptional()
  @IsString()
  paxs?: string;

  constructor(id: string, ptc?: PaxCategory, paxs?: string) {
    this.offerItemId = id;
    this.ptc = ptc;
    this.paxs = paxs;
  }
}

export class Offer {
  @IsString()
  @Length(1)
  public readonly offerId: string;
  @ValidateNested()
  public offerItems: OfferItem[];
  @IsOptional()
  @IsString()
  @Length(1)
  public readonly offerOwner?: string;
  @IsOptional()
  @IsString()
  @Length(1)
  public readonly responseId?: string;

  constructor(
    offerId: string,
    offerItems: OfferItem[],
    offerOwner?: string,
    responseId?: string
  ) {
    this.offerId = offerId;
    this.offerOwner = offerOwner;
    this.responseId = responseId;
    this.offerItems = offerItems.map(
      (item) => new OfferItem(item.offerItemId, item.ptc, item.paxs)
    );
  }
}

export type PriceProps = RequestProps<PriceParams>;

export class PriceParams extends AbstractRequestParams {
  @IsArray()
  @ValidateNested()
  public readonly offers: Offer[];

  private constructor(props: PriceProps) {
    super();
    this.offers = props.offers.map(
      (offerData) =>
        new Offer(
          offerData.offerId,
          offerData.offerItems,
          offerData.offerOwner,
          offerData.responseId
        )
    );
  }

  public static create(props: PriceProps): Result<PriceParams> {
    const params = new PriceParams(props);
    return AbstractRequestParams.validate<PriceParams>(params);
  }

  /**
   * @return {offerId: string, offerItemIds: string[]}
   */
  asPlain() {
    const offerId = this.offers[0].offerId,
      offerItemIds = this.offers.reduce((items: string[], { offerItems }) => {
        return [...items, ...offerItems.map(({ offerItemId }) => offerItemId)];
      }, []);
    return { offerId, offerItemIds };
  }
}
