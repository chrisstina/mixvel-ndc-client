const {DateTime} = require('luxon')

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {SearchParams} from "../../../core/request/parameters/Search";
import {PartyCredentials} from "../TicketMeRequest";

import {AirShoppingRQ, OriginDestination, Pax} from "../messages/AirShoppingRQ";
import {TicketMePTC, toTicketMe as toTicketMePTC} from "./dictionary/ptc";
import {TicketMeCabin, toTicketMe as toTicketMeCabin} from "./dictionary/cabin";
import {Preflevel} from "../constants/preflevel";

export class SearchMessageMapper implements IMessageMapper {
    message: AirShoppingRQ

    constructor(public readonly params: SearchParams,
                public readonly credentials: PartyCredentials) {
        this.message = new AirShoppingRQ()
        this.message.addParty(this.credentials)
    }

    map(): AirShoppingRQ {
        this.setCabinPreference(toTicketMeCabin(this.params.cabin))
        if (this.params.onlyDirect) {
            this.setDirectPreference(Preflevel.PREFERRED)
        }

        this.params.originDestinations.forEach(od => {
            this.addOriginDestination(
                od.from,
                od.to,
                DateTime.fromJSDate(od.dateRangeStart).toISODate(),
            )
        })
        this.params.travelers.forEach(({id, ptc}) => {
            this.addPax(generatePaxId(id), toTicketMePTC(ptc))
        })
        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            this.addCarrierFilters(this.params.preferredCarriers, Preflevel.PREFERRED)
        }
        return this.message
    }

    private addPax(id: string, ptc: TicketMePTC) {
        this.message.DataLists[0].PassengerList[0].Passenger.push(new Pax(id, ptc))
    }

    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    private addOriginDestination(originCode: string, destinationCode: string, date: string) {
        const OD = new OriginDestination()
        OD.Arrival.push({AirportCode: [{_: destinationCode}]})
        OD.Departure.push({AirportCode: [{_: originCode}], Date: [{_: date}]})
        this.message.CoreQuery[0].OriginDestinations[0].OriginDestination.push(OD)
    }

    private setCabinPreference(cabin: TicketMeCabin) {
        this.message.Preference[0].CabinPreferences[0].CabinType[0].Code[0]._ = cabin
    }

    private setDirectPreference(preference: Preflevel) {
        this.message.Preference[0]['FlightPreferences'] = [{Characteristic: [{DirectPreferences: [{_: preference}]}]}]
    }

    private addCarrierFilters(carriers: string[], level: Preflevel) {
        const airlines = carriers.map(carrier => {
            return {
                $: {PreferencesLevel: level},
                AirlineID: [{_: carrier}]
            }
        })
        if (!this.message.Preference[0].AirlinePreferences) {
            this.message.Preference[0]['AirlinePreferences'] = []
        }
        this.message.Preference[0].AirlinePreferences.push({Airline: airlines})
    }
}

const generatePaxId = (id: string) => `PAX${id}`