import { IsArray, IsString, Length, ValidateNested } from "class-validator";
import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import {
  OfferItem,
  PriceProps,
} from "../../../../core/request/parameters/Price";
import { PaxCategory } from "../../../../core/request/types";
import { Result } from "../../../../core/Result";

class SirenaFareRule {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly carrier: string,
    public readonly date: string,
    public readonly fareBasisCode: string,
    public readonly fareRuleLocator: string
  ) {}
}

export class SirenaOfferItemOpts {
  @IsString()
  innerPTC: string = "";
  fareRule?: SirenaFareRule;

  constructor(opts?: {
    innerPTC?: string;
    fareRule?: {
      from: string;
      to: string;
      carrier: string;
      date: string;
      fareBasisCode: string;
      fareRuleLocator: string;
    };
  }) {
    if (opts?.innerPTC) {
      this.innerPTC = opts.innerPTC;
    }
    if (opts?.fareRule) {
      this.fareRule = new SirenaFareRule(
        opts.fareRule.from,
        opts.fareRule.to,
        opts.fareRule.carrier,
        opts.fareRule.date,
        opts.fareRule.fareBasisCode,
        opts.fareRule.fareRuleLocator
      );
    }
  }
}

class SirenaOfferItem extends OfferItem {
  @IsString()
  ptc?: PaxCategory;
  @IsString()
  paxs?: string;
  opts?: SirenaOfferItemOpts;

  constructor(
    offerItemId: string,
    ptc?: PaxCategory,
    paxs?: string,
    opts?: SirenaOfferItemOpts
  ) {
    super(offerItemId, ptc, paxs, new SirenaOfferItemOpts(opts));
  }
}

export class SirenaOffer {
  @IsString()
  @Length(1)
  public readonly offerId: string;
  @ValidateNested()
  public offerItems: SirenaOfferItem[];
  @IsString()
  @Length(1)
  public readonly offerOwner?: string;
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
      (item) =>
        new SirenaOfferItem(item.offerItemId, item.ptc, item.paxs, item.opts)
    );
  }
}

export class SirenaPriceParams extends AbstractRequestParams {
  @IsArray()
  @ValidateNested()
  public readonly offers: SirenaOffer[];

  private constructor(props: PriceProps) {
    super();
    this.offers = props.offers.map(
      (offerData) =>
        new SirenaOffer(
          offerData.offerId,
          offerData.offerItems,
          offerData.offerOwner,
          offerData.responseId
        )
    );
  }

  public static create(props: PriceProps): Result<SirenaPriceParams> {
    const params = new SirenaPriceParams(props);
    return AbstractRequestParams.validate<SirenaPriceParams>(params);
  }
}
