import { PaxCategory } from "../../../../request/types";
export declare enum TicketMePTC {
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
export declare function toTicketMe(paxCategory: PaxCategory): TicketMePTC;
