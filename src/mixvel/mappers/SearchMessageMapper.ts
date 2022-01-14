import {MixvelMessageMapper} from "./MixvelMessageMapper";
import {SearchParams} from "../../request/parameters";

import {Mixvel_AirShoppingRQ} from "../messages/Mixvel_AirShoppingRQ";
import {toMixvel as toMixvelPTC} from "./dictionary/ptc";
import {toMixvel as toMixvelCabin} from "./dictionary/cabin";

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
                toMixvelCabin(this.params.cabin)
            )
        })

        this.params.travelers.forEach(({id, ptc, age}) => { // @todo maybe autogenerate id?
            mixvelRequestMessage.addPax(id, toMixvelPTC(ptc), age)
        })

        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            mixvelRequestMessage.addCarrierCriteria(this.params.preferredCarriers)
        }

        return mixvelRequestMessage
    }
}