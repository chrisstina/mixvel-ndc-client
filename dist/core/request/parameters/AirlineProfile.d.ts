import { Result } from "../../Result";
import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
export declare type AirlineProfileProps = RequestProps<AirlineProfileParams>;
export declare class AirlineProfileParams extends AbstractRequestParams {
    readonly airlineCode: string;
    private constructor();
    static create(props: AirlineProfileProps): Result<AirlineProfileParams>;
}
