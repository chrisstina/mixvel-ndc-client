import {PricingOption} from "../../../../core/request/types";

export enum Mixvel_PricingOption {
  LOWEST_FARE = "Simple",
  ALL_FARES = "Extended",
}
export function toMixvel(pricingOption: PricingOption): Mixvel_PricingOption {
  return Mixvel_PricingOption[pricingOption];
}
