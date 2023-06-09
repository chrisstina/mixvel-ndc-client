import { PaxCategory } from "../../../../core/request/types";

export enum SirenaPTC {
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
  STATERESIDENT = "ADT",
}

export function toSirena(paxCategory: PaxCategory): SirenaPTC {
  return SirenaPTC[paxCategory];
}
