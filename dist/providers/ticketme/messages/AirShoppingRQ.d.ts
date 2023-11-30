import { StringValue } from "../../../core/request/types";
import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
import { TicketMePTC } from "../mappers/dictionary/ptc";
import { Preflevel } from "../../../core/constants/preflevel";
export declare class OriginDestination {
    Arrival: {
        AirportCode: StringValue[];
    }[];
    Departure: {
        AirportCode: StringValue[];
        Date: StringValue[];
    }[];
}
export declare class Pax {
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
    CoreQuery: {
        OriginDestinations: {
            OriginDestination: OriginDestination[];
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
    get nodeName(): string;
}
export {};
