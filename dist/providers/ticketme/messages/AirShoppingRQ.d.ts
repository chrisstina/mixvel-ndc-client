import { AbstractTicketMeNDCMessage, StringValue } from "./AbstractTicketMeNDCMessage";
import { TicketMePTC } from "../mappers/dictionary/ptc";
import { TicketMeCabin } from "../mappers/dictionary/cabin";
import { Preflevel } from "../constants/preflevel";
export declare class OriginDestination {
    Arrival: {
        AirportCode: StringValue[];
    }[];
    Departure: {
        AirportCode: StringValue[];
        Date: StringValue[];
    }[];
}
declare class Pax {
    $: {
        PassengerID: string;
    };
    PTC: StringValue[];
    constructor(id: string, ptc?: TicketMePTC);
}
declare type AirlinePreference = {
    Airline: {
        $: {
            PreferencesLevel: Preflevel;
        };
        AirlineID: StringValue[];
    }[];
};
declare type CabinPreference = {
    CabinType: {
        Code: StringValue[];
    }[];
};
declare type FlightPreference = {
    Characteristic: {
        DirectPreferences: StringValue[];
    }[];
};
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export declare class AirShoppingRQ extends AbstractTicketMeNDCMessage {
    get nodeName(): string;
    CoreQuery: {
        "OriginDestinations": {
            "OriginDestination": OriginDestination[];
        }[];
    }[];
    Preference: {
        FlightPreferences?: FlightPreference[];
        CabinPreferences: CabinPreference[];
        AirlinePreferences?: AirlinePreference[];
    }[];
    DataLists: {
        PassengerList: {
            Passenger: Pax[];
        }[];
    }[];
    addPax(id: string, ptc: TicketMePTC): void;
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} date ISO datetime 2021-11-25
     */
    addOriginDestination(originCode: string, destinationCode: string, date: string): void;
    setCabinPreference(cabin: TicketMeCabin): void;
    setDirectPreference(preference: Preflevel): void;
    addCarrierFilters(carriers: string[], level: Preflevel): void;
}
export {};
