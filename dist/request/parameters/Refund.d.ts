import { Result } from "../../core/Result";
export declare type RefundProps = {
    orderId: string;
    orderItemIds: string[][];
};
export declare class RefundParams {
    readonly orderId: string;
    readonly orderItemIds: string[][];
    private constructor();
    static create(props: RefundProps): Result<RefundParams>;
}
