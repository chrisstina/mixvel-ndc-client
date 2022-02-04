/*
 * Copyright (c) 2021
 */

import {GenericTicketMeNDCMessage, StringValue} from "./GenericTicketMeNDCMessage";
import {TicketMePTC} from "../mappers/dictionary/ptc";
import {Preflevel} from "../constants/preflevel";

export class OriginDestination {     // @todo <SegMaxTimePreferences>
    public Arrival: { AirportCode: StringValue[] }[] = []
    public Departure: { AirportCode: StringValue[], Date: StringValue[] }[] = []
}

class Pax {
    public $: { PassengerID: string }
    public PTC: StringValue[] = []

    constructor(id: string,
                ptc: TicketMePTC = TicketMePTC.ADULT) {
        this.$ = {PassengerID: id}
        this.PTC.push({_: ptc})
    }
}

type AirlinePreference = { Airline: { $: { PreferencesLevel: Preflevel }, AirlineID: StringValue[] }[] }


/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export class AirShoppingRQ extends GenericTicketMeNDCMessage {
    get nodeName() {
        return "AirShoppingRQ"
    }

    public CoreQuery: { "OriginDestinations": { "OriginDestination": OriginDestination[] }[] }[] = [
        {
            OriginDestinations: [
                {OriginDestination: []}
            ]
        }
    ]
    public Preference: { AirlinePreferences: AirlinePreference[] }[] = []
    public DataLists: { PassengerList: { Passenger: Pax[] }[] }[] = [
        {
            PassengerList: [
                {
                    Passenger: []
                }
            ]
        }
    ]

    // public "Metadata" = [
    //     {
    //         "Other": [
    //             {
    //                 "OtherMetadata": [
    //                     {
    //                         "LanguageMetadatas": [
    //                             {
    //                                 "LanguageMetadata": [
    //                                     {
    //                                         "$": {
    //                                             "MetadataKey": "LG1"
    //                                         },
    //                                         "Code_ISO": [
    //                                             {
    //                                                 "_": "ru"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]

    // public Parameters = [
    //     {
    //         "CurrCodes": [
    //             {
    //                 "FiledInCurrency": [
    //                     {
    //                         "CurrCode": [
    //                             {
    //                                 "_": "EUR"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ] // @todo

    addPax(id: string, ptc: TicketMePTC) {
        this.DataLists[0].PassengerList[0].Passenger.push(new Pax(id, ptc))
    }

    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    addOriginDestination(originCode: string, destinationCode: string, date: string) {
        const OD = new OriginDestination()
        OD.Arrival.push({AirportCode: [{_: destinationCode}]})
        OD.Departure.push({AirportCode: [{_: originCode}], Date: [{_: date}]})
        this.CoreQuery[0].OriginDestinations[0].OriginDestination.push(OD)
    }

    addCarrierFilters(carriers: string[], level: Preflevel) {
        const airlines = carriers.map(carrier => {
            return  {
                $: {PreferencesLevel: level},
                AirlineID: [{_: carrier}]
            }
        })
        if (this.Preference.length === 0) {
            this.Preference.push({AirlinePreferences: []})
        }
        this.Preference[0].AirlinePreferences.push({Airline: airlines})
    }
}