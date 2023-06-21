import { IsIn, IsString, MinLength, ValidateNested } from "class-validator";
import { Result } from "../../../../core/Result";
import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import {
  Payment,
  TicketIssueProps,
} from "../../../../core/request/parameters/TicketIssue";
import { FopType } from "../../../../core/request/types";

class SirenaFormOfPayment {
  @IsIn(["CASH", "BILL"])
  public type: FopType;
  public data?: string | Record<string, unknown>;

  constructor(type: FopType, data?: string | Record<string, unknown>) {
    this.data = data;
    this.type = type;
  }
}

export class SirenaTicketIssueParams extends AbstractRequestParams {
  @IsString()
  @MinLength(1)
  orderId: string;
  @IsString()
  @MinLength(1)
  orderOwner: string;
  @ValidateNested()
  payment: Payment;
  @ValidateNested()
  formOfPayment: SirenaFormOfPayment;

  private constructor(props: TicketIssueProps) {
    super();
    this.orderId = props.orderId;
    this.formOfPayment = new SirenaFormOfPayment(
      props.formOfPayment.type,
      props.formOfPayment.data
    );
    this.payment = new Payment(props.payment.amount, props.payment.currency);
    this.orderOwner = props.orderOwner || "";
  }

  public static create(
    props: TicketIssueProps
  ): Result<SirenaTicketIssueParams> {
    const params = new SirenaTicketIssueParams(props);
    return AbstractRequestParams.validate<SirenaTicketIssueParams>(params);
  }
}
