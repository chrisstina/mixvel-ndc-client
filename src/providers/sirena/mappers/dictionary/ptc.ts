import { PaxCategory } from "../../../../core/request/types";

export enum SirenaPTC {
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
  STATERESIDENT = "ADT",
}

export function toSirena(paxCategory: PaxCategory): SirenaPTC {
  return SirenaPTC[paxCategory];
}
