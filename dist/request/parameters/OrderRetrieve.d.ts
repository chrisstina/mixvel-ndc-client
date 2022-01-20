import { Result } from "../../core/Result";
export declare type OrderRetrieveProps = {
    orderId: string;
};
export declare class OrderRetrieveParams {
    readonly orderId: string;
    private constructor();
    static create(props: OrderRetrieveProps): Result<OrderRetrieveParams>;
}
