import {PricingOption} from "../../../../core/request/types";

export declare enum Mixvel_PricingOption {
    LOWEST_FARE = "Simple",
    ALL_FARES = "Extended"
}
export declare function toMixvel(pricingOption: PricingOption): Mixvel_PricingOption;
