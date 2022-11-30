import {PaxCategory} from "../../../../core/request/types";

export declare enum TicketMePTC {
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
export declare function toTicketMe(paxCategory: PaxCategory): TicketMePTC;
