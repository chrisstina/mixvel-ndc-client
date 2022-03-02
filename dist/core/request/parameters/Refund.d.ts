import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
export declare type RefundProps = RequestProps<RefundParams>;
export declare class RefundParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly orderItemIds: string[][];
    private constructor();
}
