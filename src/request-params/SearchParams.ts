import {GenericRequestParams} from "./GenericRequestParams";
import {Cabin, PaxCategory} from "./dictionary/types";

class OriginDestination {
    constructor(public from: string,
                public to: string,
                public dateRangeStart: string | Date,
                public dateRangeEnd: string | Date
    ) {
    }
}

class AnonymousTraveler {
    constructor(public id: string,
                public ptc: PaxCategory,
                public age: string) {
    }
}

export class SearchParams implements GenericRequestParams {
    constructor(public originDestinations: OriginDestination[],
                public travelers: AnonymousTraveler[],
                public cabin: Cabin,
                public preferredCarriers: string[]|null = null) {
    }
}