import {Cabin} from "../../../../request/types"

export enum MixvelCabin {
    ECONOMY = "Economy",
    BUSINESS = "Business"
}

export function toMixvel(cabin: Cabin): MixvelCabin {
    return MixvelCabin[cabin] || MixvelCabin.ECONOMY
}