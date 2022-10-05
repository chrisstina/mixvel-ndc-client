/*
 * Copyright (c) 2021
 */

import {INDCMessage} from "../../../interfaces/INDCMessage";
import {MixvelPTC} from "../mappers/dictionary/ptc"
import {Preflevel} from "../constants/preflevel";

export class OriginDestination {
    public CabinType = {
        "CabinTypeCode": "",
        "PrefLevel": {"PrefLevelCode": ""}
    }

    public ConnectionPrefRefID?: string = ''

    public DestArrivalCriteria = {
        "IATA_LocationCode": ""
    }

    public OriginDepCriteria = {
        "DateRangeStart": "",
        "DateRangeEnd": "",
        "IATA_LocationCode": ""
    }
}

export class Pax {
    public readonly PaxID: string
    public readonly PTC: MixvelPTC
    public readonly AgeMeasure: string | undefined

    constructor(id: string,
                ptc: MixvelPTC = MixvelPTC.ADULT,
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
export class Mixvel_AirShoppingRQ implements INDCMessage {
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

    public ShoppingCriteria: ShoppingCriteria[] = []
}

export type CarrierCriteria = {
    Carrier: { AirlineDesigCode: string }[],
    CarrierPrefID: Preflevel
}

export type ConnectionCriteria = {
    "ConnectionPrefID": string,
    "MaximumConnectionQty": string
}

export type PricingMethodCriteria = {
    "BestPricingOptionText": string
}

export type ProgramCriteria = {
    ProgramContract?: { ContractID: string }[], // contract number
    ProgramAccount?: { AccountID: string }[] // promo code
    TypeCode?: string
}

type ShoppingCriteria = {
    CarrierCriteria?: CarrierCriteria[],
    ConnectionCriteria?: ConnectionCriteria[],
    ProgramCriteria?: ProgramCriteria[],
    PricingMethodCriteria?: PricingMethodCriteria[]
}