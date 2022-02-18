import { AbstractParams } from "./AbstractParams";
export declare type OrderRetrieveProps = {
    orderId: string;
    offerOwner?: string;
};
export declare class OrderRetrieveParams extends AbstractParams {
    readonly orderId: string;
    readonly offerOwner?: string;
    private constructor();
}
