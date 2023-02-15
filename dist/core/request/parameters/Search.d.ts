import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { Cabin, PaxCategory, PricingOption } from "../types";
import { Result } from "../../Result";
export declare class OriginDestination {
    from: string;
    to: string;
    dateRangeStart: Date;
    dateRangeEnd: Date;
    constructor(from: string, to: string, dateRangeStart: Date, dateRangeEnd: Date);
}
declare class AnonymousTraveler {
    readonly id: string;
    readonly ptc: PaxCategory;
    readonly age: number;
    constructor(id: string, ptc: PaxCategory, age: number);
}
export declare type Contract3D = {
    clientCode: string;
    agencyCode?: string;
    contractType?: string;
    discountPercent?: number;
};
/**
 * @typedef SearchProps
 * @property {Array} originDestinations
 * @property {Array} travelers
 * @property {Cabin} cabin
 * @property {Array} preferredCarriers
 */
export declare type SearchProps = RequestProps<SearchParams>;
export declare class SearchParams extends AbstractRequestParams {
    originDestinations: OriginDestination[];
    readonly travelers: AnonymousTraveler[];
    readonly cabin: Cabin;
    readonly preferredCarriers?: string[];
    readonly onlyDirect?: boolean;
    readonly pricingOption?: PricingOption;
    readonly contract3D?: Contract3D;
    readonly preferredRBD?: string[];
    private constructor();
    static create(props: SearchProps): Result<SearchParams>;
}
export {};
