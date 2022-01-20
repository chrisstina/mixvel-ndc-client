import { Result } from "../../core/Result";
export declare type PriceProps = {
    offerId: string;
    offerItemIds: string[];
};
export declare class PriceParams {
    readonly offerId: string;
    readonly offerItemIds: string[];
    private constructor();
    static create(props: PriceProps): Result<PriceParams>;
}
