import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export declare type RepriceProps = RequestProps<RepriceParams>;
export declare class RepriceParams extends AbstractRequestParams {
    readonly orderId: string;
    static create(props: RepriceProps): Result<RepriceParams>;
    private constructor();
}
