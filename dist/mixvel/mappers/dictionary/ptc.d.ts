import { PaxCategory } from "../../../request/types";
export declare enum MixvelPTC {
    ADULT = "ADT",
    CHILD = "CNN",
    INFANT = "INF"
}
export declare function toMixvel(paxCategory: PaxCategory): MixvelPTC;
