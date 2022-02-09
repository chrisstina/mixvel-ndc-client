import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {Mixvel_AirShoppingRQ} from "../messages/Mixvel_AirShoppingRQ";
import {toMixvel as toMixvelPTC} from "./dictionary/ptc";
import {toMixvel as toMixvelCabin} from "./dictionary/cabin";
import {SearchProps} from "../../../core/request/parameters/Search";

const {DateTime} = require('luxon')

export class SearchMessageMapper implements IMessageMapper {
    constructor(public readonly params: SearchProps) {
    }
    map(): Mixvel_AirShoppingRQ {
        const mixvelRequestMessage = new Mixvel_AirShoppingRQ()

        this.params.originDestinations.forEach(od => {
            mixvelRequestMessage.addOriginDestination(
                od.from,
                od.to,
                DateTime.fromJSDate(od.dateRangeStart).toISODate(),
                DateTime.fromJSDate(od.dateRangeEnd).toISODate(),
                toMixvelCabin(this.params.cabin)
            )
        })

        this.params.travelers.forEach(({id, ptc, age}) => { // @todo maybe autogenerate id?
            mixvelRequestMessage.addPax(id, toMixvelPTC(ptc), age.toString())
        })

        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            mixvelRequestMessage.addCarrierCriteria(this.params.preferredCarriers)
        }

        return mixvelRequestMessage
    }
}