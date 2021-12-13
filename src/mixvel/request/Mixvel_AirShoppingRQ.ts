/*
 * Copyright (c) 2021
 */

import {GenericNDCMessage} from "./GenericNDCMessage";
import {Cabin} from "../constants/cabin";
import {Preflevel} from "../constants/preflevel"
import {PTC as PassengerCategory} from "../constants/ptc"

export class OriginDestination {
    public CabinType = {
        "CabinTypeCode": "",
        "PrefLevel": {"PrefLevelCode": ""}
    }

    public DestArrivalCriteria = {
        "IATA_LocationCode": ""
    }

    public OriginDepCriteria = {
        "DateRangeStart": "",
        "DateRangeEnd": "",
        "IATA_LocationCode": ""
    }
}

class Pax {
    public readonly PaxID: string
    public readonly PTC: PassengerCategory
    public readonly AgeMeasure: string | undefined

    constructor(id: string,
                ptc: PassengerCategory = PassengerCategory.ADULT,
                age?: string) {
        // mind the property order!
        if (age) {
            this.AgeMeasure = age
        }
        this.PaxID = id
        this.PTC = ptc
    }
}

/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export class Mixvel_AirShoppingRQ implements GenericNDCMessage {
    get endpoint() {
        return 'api/Order/airshopping'
    }

    get xmlns() {
        return {'xmlns:shop': 'https://www.mixvel.com/API/XSD/Mixvel_AirShoppingRQ/1_01'}
    }

    get nodeName() {
        return "shop:Mixvel_AirShoppingRQ"
    }

    public "FlightRequest" = {
        "FlightRequestOriginDestinationsCriteria": {
            "OriginDestCriteria": Array()
        }
    }

    public "Paxs" = {
        "Pax": Array()
    }

    public ShoppingCriteria = Array()

    addPax(id: string, ptc: PassengerCategory, age?: string) {
        this.Paxs.Pax.push(new Pax(id, ptc, age))
    }

    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {Cabin} cabinTypeCode
     */
    addOriginDestination(originCode: string, destinationCode: string, dateRangeStart: string, dateRangeEnd: string, cabinTypeCode: Cabin) {
        const OD = new OriginDestination()
        OD.OriginDepCriteria = {
            "DateRangeStart": dateRangeStart,
            "DateRangeEnd": dateRangeEnd,
            "IATA_LocationCode": originCode
        }
        OD.DestArrivalCriteria = {"IATA_LocationCode": destinationCode}
        OD.CabinType = {CabinTypeCode: cabinTypeCode, PrefLevel: {PrefLevelCode: Preflevel.REQUIRED}}
        this.FlightRequest.FlightRequestOriginDestinationsCriteria.OriginDestCriteria.push(OD)
    }

    addCarrierCriteria(allowedCarrierCodes: string[]) {
        this.ShoppingCriteria.push({"CarrierCriteria": [{
            "Carrier": []
        }]})
        allowedCarrierCodes.forEach(code => {
            this.ShoppingCriteria[0].CarrierCriteria[0].Carrier.push(
                {
                    "AirlineDesigCode": code
                }
            )
        })
    }
}