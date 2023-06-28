import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MinLength,
  ValidateNested,
} from "class-validator";
import { PaxCategory } from "../types";
import { Result } from "../../Result";
import { PersonalInfo } from "./Book";

export class OfferItem {
  @IsString()
  offerItemId: string;
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @MinLength(1, { each: true })
  public readonly paxRefs: string[];
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @MinLength(1, { each: true })
  public readonly segmentRefs: string[];
  @IsOptional()
  @IsNumber()
  @Max(10)
  public readonly quantity?: number;

  constructor(
    id: string,
    paxRefs: string[] = [],
    segmentRefs: string[] = [],
    quantity: number = 1
  ) {
    this.offerItemId = id;
    this.paxRefs = paxRefs;
    this.segmentRefs = segmentRefs;
    this.quantity = quantity;
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
      (item) =>
        new OfferItem(
          item.offerItemId,
          item.paxRefs,
          item.segmentRefs,
          item.quantity
        )
    );
  }
}

export type OrderChangeProps = RequestProps<OrderChangeParams>;

export class OrderPassenger {
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
  @ValidateNested()
  public personalInfo: PersonalInfo;

  constructor(
    ptc: PaxCategory,
    personalInfo: {
      firstName: string;
      lastName: string;
      middleName?: string;
      dob: Date;
    },
    public readonly id?: string,
    public readonly infantRef?: string
  ) {
    this.ptc = ptc;
    this.personalInfo = new PersonalInfo(
      personalInfo.firstName,
      personalInfo.lastName,
      "M",
      personalInfo.dob,
      personalInfo.middleName
    );
  }
}

export class OrderChangeParams extends AbstractRequestParams {
  @IsOptional()
  @IsString()
  public readonly orderId: string;
  @IsString()
  @IsOptional()
  public readonly orderOwner: string;
  @IsArray()
  @ValidateNested()
  public readonly offers: Offer[];
  @IsArray()
  @ValidateNested()
  public readonly passengers?: OrderPassenger[];

  private constructor(props: OrderChangeProps) {
    super();
    this.orderId = props.orderId;
    this.orderOwner = props.orderOwner;
    this.offers = props.offers.map(
      (offerData) =>
        new Offer(
          offerData.offerId,
          offerData.offerItems,
          offerData.offerOwner,
          offerData.responseId
        )
    );
    if (props.passengers) {
      this.passengers = props.passengers.map(
        (passengerData) =>
          new OrderPassenger(
            passengerData.ptc,
            passengerData.personalInfo,
            passengerData.id
          )
      );
    }
  }

  public static create(props: OrderChangeProps): Result<OrderChangeParams> {
    const params = new OrderChangeParams(props);
    return AbstractRequestParams.validate<OrderChangeParams>(params);
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
