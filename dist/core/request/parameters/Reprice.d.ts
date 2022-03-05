import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
export declare type RepriceProps = RequestProps<RepriceParams>;
export declare class RepriceParams extends AbstractRequestParams {
    readonly orderId: string;
    private constructor();
}
