import { GenericRequestParams } from "./GenericRequestParams";
export declare class OrderRetrieveParams implements GenericRequestParams {
    readonly orderId: string;
    constructor(orderId: string);
}
