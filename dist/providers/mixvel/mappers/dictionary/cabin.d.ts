import { Cabin } from "../../../../core/request/types";
export declare enum MixvelCabin {
    ECONOMY = "Economy",
    BUSINESS = "Business"
}
export declare function toMixvel(cabin: Cabin): MixvelCabin;
