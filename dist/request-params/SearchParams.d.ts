import { GenericRequestParams } from "./GenericRequestParams";
import { Cabin, PaxCategory } from "./dictionary/types";
declare class OriginDestination {
    from: string;
    to: string;
    dateRangeStart: string | Date;
    dateRangeEnd: string | Date;
    constructor(from: string, to: string, dateRangeStart: string | Date, dateRangeEnd: string | Date);
}
declare class AnonymousTraveler {
    id: string;
    ptc: PaxCategory;
    age: string;
    constructor(id: string, ptc: PaxCategory, age: string);
}
export declare class SearchParams implements GenericRequestParams {
    originDestinations: OriginDestination[];
    travelers: AnonymousTraveler[];
    cabin: Cabin;
    preferredCarriers: string[] | null;
    constructor(originDestinations: OriginDestination[], travelers: AnonymousTraveler[], cabin: Cabin, preferredCarriers?: string[] | null);
}
export {};
