const {DateTime} = require('luxon')

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {SearchProps} from "../../../core/request/parameters/Search";

import {Mixvel_AirShoppingRQ, OriginDestination, Pax} from "../messages/Mixvel_AirShoppingRQ";
import {toMixvel as toMixvelPTC} from "./dictionary/ptc";
import {MixvelCabin, toMixvel as toMixvelCabin} from "./dictionary/cabin";
import {Preflevel} from "../constants/preflevel";

export class SearchMessageMapper implements IMessageMapper {
    message = new Mixvel_AirShoppingRQ()

    constructor(public readonly params: SearchProps) {
    }

    map(): Mixvel_AirShoppingRQ {
        let connectionId: string
        if (this.params.onlyDirect) {
            connectionId = 'Connection-1' // @todo
            this.addConnectionCriteria(connectionId, '1')
        }
        this.params.originDestinations.forEach(od => {
            this.message.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(this.createOD(
                od.from,
                od.to,
                DateTime.fromJSDate(od.dateRangeStart).toISODate(),
                DateTime.fromJSDate(od.dateRangeEnd).toISODate(),
                toMixvelCabin(this.params.cabin),
                connectionId
            ))
        })
        this.params.travelers.forEach(({id, ptc, age}) => { // @todo maybe autogenerate id?
            this.message.Paxs.Pax.push(new Pax(id, toMixvelPTC(ptc), age.toString()))
        })
        if (this.params.preferredCarriers && this.params.preferredCarriers.length > 0) {
            this.addCarrierCriteria(this.params.preferredCarriers)
        }
        return this.message
    }

    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {MixvelCabin} cabinTypeCode
     * @param {string} connectionId
     * @return {OriginDestination}
     */
    private createOD(originCode: string, destinationCode: string, dateRangeStart: string, dateRangeEnd: string, cabinTypeCode: MixvelCabin, connectionId: string | undefined) {
        const OD = new OriginDestination()
        if (connectionId) {
            OD.ConnectionPrefRefID = connectionId
        } else {
            delete OD.ConnectionPrefRefID
        }
        OD.OriginDepCriteria.DateRangeStart = dateRangeStart
        OD.OriginDepCriteria.DateRangeEnd = dateRangeEnd
        OD.OriginDepCriteria.IATA_LocationCode = originCode
        OD.DestArrivalCriteria = {"IATA_LocationCode": destinationCode}
        OD.CabinType = {CabinTypeCode: cabinTypeCode, PrefLevel: {PrefLevelCode: Preflevel.REQUIRED}}
        return OD
    }

    private addCarrierCriteria(allowedCarrierCodes: string[]) {
        this.message.ShoppingCriteria.push({
            "CarrierCriteria": [{
                "Carrier": []
            }]
        })
        allowedCarrierCodes.forEach(code => {
            this.message.ShoppingCriteria[0].CarrierCriteria[0].Carrier.push(
                {
                    "AirlineDesigCode": code
                }
            )
        })
    }

    private addConnectionCriteria(connectionId: string, maxConnections: string) {
        this.message.ShoppingCriteria.push({
            "ConnectionCriteria": [{
                "ConnectionPrefID": connectionId,
                "MaximumConnectionQty": maxConnections
            }]
        })
    }
}