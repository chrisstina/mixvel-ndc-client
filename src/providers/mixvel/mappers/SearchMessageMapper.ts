const {DateTime} = require('luxon')

import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {Contract3D, SearchProps} from "../../../core/request/parameters/Search";
import {PricingOption} from "../../../core/request/types";

import {Mixvel_AirShoppingRQ, OriginDestination, Pax, ProgramCriteria} from "../messages/Mixvel_AirShoppingRQ";
import {toMixvel as toMixvelPTC} from "./dictionary/ptc";
import {MixvelCabin, toMixvel as toMixvelCabin} from "./dictionary/cabin";
import {toMixvel as toMixvelPricingOption} from "./dictionary/pricingoption";
import {Preflevel} from "../constants/preflevel";

export class SearchMessageMapper implements IMessageMapper {
    message = new Mixvel_AirShoppingRQ()

    constructor(public readonly params: SearchProps) {
    }

    map(): Mixvel_AirShoppingRQ {
        // mind the order of fields!
        let connectionId = this.generateConnectionId()
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
        if (connectionId) {
            this.addConnectionCriteria(connectionId, '1')
        }
        if (this.params.pricingOption) {
            this.addPricingCriteria(this.params.pricingOption)
        }
        if (this.params.contract3D) {
            this.addProgramCriteria(this.params.contract3D)
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
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({'CarrierCriteria': []})
        }
        this.message.ShoppingCriteria[0].CarrierCriteria = [{
            "Carrier": allowedCarrierCodes.map(code => {
                return {
                    "AirlineDesigCode": code
                }
            })
        }]
    }

    private addConnectionCriteria(connectionId: string, maxConnections: string) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({'ConnectionCriteria': []})
        }
        this.message.ShoppingCriteria[0].ConnectionCriteria = [{
            "ConnectionPrefID": connectionId,
            "MaximumConnectionQty": maxConnections
        }]
    }

    private addPricingCriteria(pricingOption: PricingOption) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({'PricingMethodCriteria': []})
        }
        this.message.ShoppingCriteria[0].PricingMethodCriteria = [{
            "BestPricingOptionText": toMixvelPricingOption(pricingOption)
        }]
    }

    private addProgramCriteria(contract: Contract3D) {
        if (this.message.ShoppingCriteria.length === 0) {
            this.message.ShoppingCriteria.push({'ProgramCriteria': []})
        }
        const criterion: ProgramCriteria = {}
        if (contract.contractNumber) {
            criterion.ProgramContract = []
            criterion.ProgramContract.push({ContractID: contract.contractNumber})
        }
        if (contract.clientCode) {
            criterion.ProgramAccount = []
            criterion.ProgramAccount.push({AccountID: contract.clientCode})
        }
        if (contract.contractType) {
            criterion.TypeCode = contract.contractType
        }
        this.message.ShoppingCriteria[0].ProgramCriteria = [criterion]
    }

    private generateConnectionId(): string|undefined {
        if (this.params.onlyDirect) {
            return 'Connection-1'
        }
        return undefined
    }
}