import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
export declare type OrderRetrieveProps = RequestProps<OrderRetrieveParams>;
export declare class OrderRetrieveParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly offerOwner?: string;
    private constructor();
}
