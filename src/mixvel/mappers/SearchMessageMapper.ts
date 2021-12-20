import {SearchParams} from "../../request-params/SearchParams";
import {MixvelMessageMapper} from "./MixvelMessageMapper";
import {Mixvel_AirShoppingRQ} from "../request/Mixvel_AirShoppingRQ";

import {Cabin as MixvelCabin} from "../constants/cabin";
import {PTC as MixvelPTC} from "../constants/ptc";

const {DateTime} = require('luxon')

export class SearchMessageMapper implements MixvelMessageMapper {
    constructor(public readonly params: SearchParams) {
    }
    map(): Mixvel_AirShoppingRQ {
        const mixvelRequestMessage = new Mixvel_AirShoppingRQ()

        this.params.originDestinations.forEach(od => {
            mixvelRequestMessage.addOriginDestination(
                od.from,
                od.to,
                DateTime.fromISO(od.dateRangeStart).toISODate(),
                DateTime.fromISO(od.dateRangeEnd).toISODate(),
                MixvelCabin[this.params.cabin] || MixvelCabin.ECONOMY
            )
        })

        this.params.travelers.forEach(({id, ptc, age}) => {
            mixvelRequestMessage.addPax(id, MixvelPTC[ptc], age)
        })

        if (this.params.preferredCarriers) {
            mixvelRequestMessage.addCarrierCriteria(this.params.preferredCarriers)
        }

        return mixvelRequestMessage
    }
}