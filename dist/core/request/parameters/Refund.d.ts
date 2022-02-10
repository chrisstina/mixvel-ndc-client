import { AbstractParams } from "./AbstractParams";
export declare type RefundProps = {
    orderId: string;
    orderItemIds: string[][];
};
export declare class RefundParams extends AbstractParams {
    readonly orderId: string;
    readonly orderItemIds: string[][];
    private constructor();
}
