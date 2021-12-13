import {GenericRequestParams} from "./GenericRequestParams";

export class PriceParams implements GenericRequestParams {
    constructor(public readonly offerId: string, public readonly offerItemIds: string[]) {
    }
}