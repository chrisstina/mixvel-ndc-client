import {AbstractParams} from "./AbstractParams";
import {Cabin, PaxCategory} from "../types";

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
    onlyDirect?: boolean;
};
export declare class SearchParams extends AbstractParams {
    originDestinations: OriginDestination[];
    readonly travelers: AnonymousTraveler[];
    readonly cabin: Cabin;
    readonly preferredCarriers: string[] | null;
    readonly onlyDirect: boolean;
    private constructor();
}
export {};
