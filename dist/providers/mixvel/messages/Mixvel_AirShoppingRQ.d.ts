import { INDCMessage } from "../../../interfaces/INDCMessage";
import { MixvelPTC } from "../mappers/dictionary/ptc";
export declare class OriginDestination {
    CabinType: {
        CabinTypeCode: string;
        PrefLevel: {
            PrefLevelCode: string;
        };
    };
    ConnectionPrefRefID?: string;
    DestArrivalCriteria: {
        IATA_LocationCode: string;
    };
    OriginDepCriteria: {
        DateRangeStart: string;
        DateRangeEnd: string;
        IATA_LocationCode: string;
    };
}
export declare class Pax {
    readonly PaxID: string;
    readonly PTC: MixvelPTC;
    readonly AgeMeasure: string | undefined;
    constructor(id: string, ptc?: MixvelPTC, age?: string);
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
    ShoppingCriteria: Record<string, any>[];
}
