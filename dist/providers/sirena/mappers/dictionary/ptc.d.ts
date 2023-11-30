import { PaxCategory } from "../../../../core/request/types";
export declare enum SirenaPTC {
    ADULT = "ADT",
    CHILD = "CNN",
    INFANT = "INF",
    WSEATINFANT = "CNN",
    YOUTH = "ADT",
    SENIOR = "ADT",
    DISABLED = "ADT",
    DISABLEDCHILD = "ADT",
    ESCORT = "ADT",
    LARGEFAMILY = "ADT",
    STATERESIDENT = "ADT"
}
export declare function toSirena(paxCategory: PaxCategory): SirenaPTC;
