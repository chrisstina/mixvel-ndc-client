import { IsArray, IsString } from "class-validator";

import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { Result } from "../../Result";

export type RepriceProps = RequestProps<RepriceParams>;

export class RepriceParams extends AbstractRequestParams {
  @IsString()
  public readonly orderId: string;
  @IsArray()
  public readonly deleteOrderItems?: string[] = [];
  @IsArray()
  public readonly acceptOfferItems?: string[] = [];

  private constructor(props: RepriceProps) {
    super();
    this.orderId = props.orderId;
    if (props.deleteOrderItems) {
      this.deleteOrderItems = props.deleteOrderItems;
    }
  }

  public static create(props: RepriceProps): Result<RepriceParams> {
    const params = new RepriceParams(props);
    return AbstractRequestParams.validate<RepriceParams>(params);
  }
}
