import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {SearchProps} from "../../../request/parameters/Search";
import {PartyCredentials} from "../TicketMeRequest";

import {AirShoppingRQ} from "../messages/AirShoppingRQ";

import {toTicketMe as toTicketMePTC} from "./dictionary/ptc";
import {Preflevel} from "../constants/preflevel";

const {DateTime} = require('luxon')

export class SearchMessageMapper implements IMessageMapper {
    constructor(public readonly params: SearchProps,
                public readonly credentials: PartyCredentials) {
    }

    map(): AirShoppingRQ {
        const ticketMeAirShoppingRQ = new AirShoppingRQ()

        ticketMeAirShoppingRQ.addParty(this.credentials)

        this.params.originDestinations.forEach(od => {
            ticketMeAirShoppingRQ.addOriginDestination(
                od.from,
                od.to,
                DateTime.fromJSDate(od.dateRangeStart).toISODate(),
            )
        })

        this.params.travelers.forEach(({id, ptc}) => {
            ticketMeAirShoppingRQ.addPax(generatePaxId(id), toTicketMePTC(ptc))
        })

        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            ticketMeAirShoppingRQ.addCarrierFilters(this.params.preferredCarriers, Preflevel.PREFERRED)
        }

        return ticketMeAirShoppingRQ
    }
}

const generatePaxId = (id:string) => `PAX${id}`