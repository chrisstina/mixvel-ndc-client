import {PaxCategory} from "../../../../core/request/types";

export enum TicketMePTC {
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

export function toTicketMe(paxCategory: PaxCategory): TicketMePTC {
    return TicketMePTC[paxCategory]
}