import {GenericRequestParams} from "./GenericRequestParams";

export class OrderRetrieveParams implements GenericRequestParams {
    constructor(public readonly orderId: string) {
    }
}