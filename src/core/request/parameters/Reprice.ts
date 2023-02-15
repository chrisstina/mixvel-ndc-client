import {IsString} from "class-validator";

import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export type RepriceProps = RequestProps<RepriceParams>;

export class RepriceParams extends AbstractRequestParams {
  @IsString()
  public readonly orderId: string;

  private constructor(props: RepriceProps) {
    super();
    this.orderId = props.orderId;
  }

  public static create(props: RepriceProps): Result<RepriceParams> {
    const params = new RepriceParams(props);
    return AbstractRequestParams.validate<RepriceParams>(params);
  }
}
