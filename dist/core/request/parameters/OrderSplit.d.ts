import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { Result } from "../../Result";
export declare class SplitOrderItem {
    readonly orderItemId: string;
    readonly paxRefs: string[];
    constructor(orderItemId: string, paxRefs: string[]);
}
export declare type OrderSplitProps = RequestProps<OrderSplitParams>;
export declare class OrderSplitParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly splitOrderItems: SplitOrderItem[];
    private constructor();
    static create(props: OrderSplitProps): Result<OrderSplitProps>;
}
