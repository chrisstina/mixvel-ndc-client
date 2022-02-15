import { INDCMessage } from "../../../interfaces/INDCMessage";
import { MixvelPTC } from "../mappers/dictionary/ptc";
import { MixvelCabin } from "../mappers/dictionary/cabin";
export declare class OriginDestination {
    CabinType: {
        CabinTypeCode: string;
        PrefLevel: {
            PrefLevelCode: string;
        };
    };
    DestArrivalCriteria: {
        IATA_LocationCode: string;
    };
    OriginDepCriteria: {
        DateRangeStart: string;
        DateRangeEnd: string;
        IATA_LocationCode: string;
    };
}
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export declare class Mixvel_AirShoppingRQ implements INDCMessage {
    get xmlns(): {
        'xmlns:shop': string;
    };
    get nodeName(): string;
    "FlightRequest": {
        FlightRequestOriginDestinationsCriteria: {
            OriginDestCriteria: any[];
        };
    };
    "Paxs": {
        Pax: any[];
    };
    ShoppingCriteria: any[];
    addPax(id: string, ptc: MixvelPTC, age?: string): void;
    /**
     * @param {string} originCode
     * @param {string} destinationCode
     * @param {string} dateRangeStart ISO datetime 2021-11-25
     * @param {string} dateRangeEnd ISO datetime 2021-11-25
     * @param {MixvelCabin} cabinTypeCode
     */
    addOriginDestination(originCode: string, destinationCode: string, dateRangeStart: string, dateRangeEnd: string, cabinTypeCode: MixvelCabin): void;
    addCarrierCriteria(allowedCarrierCodes: string[]): void;
}
