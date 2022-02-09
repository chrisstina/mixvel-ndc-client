import {AbstractParams} from "./AbstractParams";

export declare type PriceProps = {
    offerId: string;
    offerItemIds: string[];
};
export declare class PriceParams extends AbstractParams {
    readonly offerId: string;
    readonly offerItemIds: string[];
    private constructor();
}
