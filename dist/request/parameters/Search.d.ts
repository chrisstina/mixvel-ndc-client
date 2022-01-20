import { Result } from "../../core/Result";
import { Cabin, PaxCategory } from "../types";
export declare class OriginDestination {
    from: string;
    to: string;
    dateRangeStart: string | Date;
    dateRangeEnd: string | Date;
    constructor(from: string, to: string, dateRangeStart: string | Date, dateRangeEnd: string | Date);
}
declare class AnonymousTraveler {
    readonly id: string;
    readonly ptc: PaxCategory;
    readonly age: number;
    constructor(id: string, ptc: PaxCategory, age: number);
}
/**
 * @typedef SearchProps
 * @property {Array} originDestinations
 * @property {Array} travelers
 * @property {Cabin} cabin
 * @property {Array} preferredCarriers
 */
export declare type SearchProps = {
    originDestinations: OriginDestination[];
    travelers: AnonymousTraveler[];
    cabin: Cabin;
    preferredCarriers: string[] | null;
};
export declare class SearchParams {
    originDestinations: OriginDestination[];
    readonly travelers: AnonymousTraveler[];
    readonly cabin: Cabin;
    readonly preferredCarriers: string[] | null;
    private constructor();
    static create(props: SearchProps): Result<SearchParams>;
}
export {};
