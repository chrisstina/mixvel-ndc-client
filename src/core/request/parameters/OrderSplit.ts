import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";

import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { Result } from "../../Result";

export class SplitOrderItem {
  @IsString()
  @MinLength(1)
  public readonly orderItemId: string;
  @IsArray()
  @IsNotEmpty()
  @MinLength(1, { each: true })
  public readonly paxRefs: string[];

  constructor(orderItemId: string, paxRefs: string[]) {
    this.orderItemId = orderItemId;
    this.paxRefs = paxRefs;
  }
}

export type OrderSplitProps = RequestProps<OrderSplitParams>;

export class OrderSplitParams extends AbstractRequestParams {
  @IsString()
  public readonly orderId: string;
  @ValidateNested()
  public readonly splitOrderItems: SplitOrderItem[];

  private constructor(props: OrderSplitParams) {
    super();
    this.orderId = props.orderId;
    this.splitOrderItems = props.splitOrderItems;
  }

  public static create(props: OrderSplitProps): Result<OrderSplitProps> {
    const params = new OrderSplitParams(props);
    return AbstractRequestParams.validate<OrderSplitParams>(params);
  }
}
