import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { Result } from "../../Result";
export declare type RefundProps = RequestProps<RefundParams>;
export declare class RefundParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly orderItemIds: string[][];
    private constructor();
    static create(props: RefundProps): Result<RefundParams>;
}
