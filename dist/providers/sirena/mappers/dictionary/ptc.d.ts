import { PaxCategory } from "../../../../core/request/types";
export declare enum SirenaPTC {
    ADULT = "ADT",
    CHILD = "CHD",
    INFANT = "INF",
    WSEATINFANT = "CHD",
    YOUTH = "ADT",
    SENIOR = "ADT",
    DISABLED = "ADT",
    DISABLEDCHILD = "ADT",
    ESCORT = "ADT",
    LARGEFAMILY = "ADT",
    STATERESIDENT = "ADT"
}
export declare function toSirena(paxCategory: PaxCategory): SirenaPTC;
