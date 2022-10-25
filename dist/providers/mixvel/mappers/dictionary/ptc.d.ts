import {PaxCategory} from "../../../../core/request/types";

export declare enum MixvelPTC {
    ADULT = "ADT",
    CHILD = "CNN",
    INFANT = "INF",
    WSEATINFANT = "INS",
    YOUTH = "YTH",
    SENIOR = "SRC",
    DISABLED = "DIS",
    DISABLEDCHILD = "DCD",
    ESCORT = "ADD",
    LARGEFAMILY = "PDB",
    STATERESIDENT = "ADT"
}
export declare function toMixvel(paxCategory: PaxCategory): MixvelPTC;
