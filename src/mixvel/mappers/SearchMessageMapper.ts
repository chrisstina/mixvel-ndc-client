import {SearchParams} from "../../request-params/SearchParams";
import {MixvelMessageMapper} from "./MixvelMessageMapper";
import {Mixvel_AirShoppingRQ} from "../request/Mixvel_AirShoppingRQ";

import {Cabin as MixvelCabin} from "../constants/cabin";
import {PTC as MixvelPTC} from "../constants/ptc";

const {DateTime} = require('luxon')

export class SearchMessageMapper implements MixvelMessageMapper {
    map(searchRequest: SearchParams): Mixvel_AirShoppingRQ {
        const mixvelRequestMessage = new Mixvel_AirShoppingRQ()

        searchRequest.originDestinations.forEach(od => {
            mixvelRequestMessage.addOriginDestination(
                od.from,
                od.to,
                DateTime.fromISO(od.dateRangeStart).toISODate(),
                DateTime.fromISO(od.dateRangeEnd).toISODate(),
                MixvelCabin[searchRequest.cabin] || MixvelCabin.ECONOMY
            )
        })

        searchRequest.travelers.forEach(({id, ptc, age}) => {
            mixvelRequestMessage.addPax(id, MixvelPTC[ptc] || MixvelPTC.ADULT, age)
        })

        return mixvelRequestMessage
    }
}