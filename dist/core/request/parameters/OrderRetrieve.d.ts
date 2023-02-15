import {AbstractRequestParams, RequestProps} from "./AbstractRequestParams";
import {Result} from "../../Result";

export declare type OrderRetrieveProps = RequestProps<OrderRetrieveParams>;
export declare class OrderRetrieveParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly offerOwner?: string;
    private constructor();
    static create(props: OrderRetrieveProps): Result<OrderRetrieveParams>;
}
