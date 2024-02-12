import { IsString, Length } from "class-validator";
import { Result } from "../../Result";
import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";

export type AirlineProfileProps = RequestProps<AirlineProfileParams>;

export class AirlineProfileParams extends AbstractRequestParams {
  @IsString()
  @Length(2, 2)
  public readonly airlineCode: string;

  private constructor(props: AirlineProfileProps) {
    super();
    this.airlineCode = props.airlineCode;
  }

  public static create(
    props: AirlineProfileProps
  ): Result<AirlineProfileParams> {
    const params = new AirlineProfileParams(props);
    return AbstractRequestParams.validate<AirlineProfileParams>(params);
  }
}
