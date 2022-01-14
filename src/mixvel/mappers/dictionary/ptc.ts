import {PaxCategory} from "../../../request/types";

export enum MixvelPTC {
    ADULT = "ADT",
    CHILD = "CNN",
    INFANT = "INF"
}

export function toMixvel(paxCategory: PaxCategory): MixvelPTC {
    return MixvelPTC[paxCategory]
}