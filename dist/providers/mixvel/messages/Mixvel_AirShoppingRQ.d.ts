import { INDCMessage } from "../../../interfaces/INDCMessage";
import { MixvelPTC } from "../mappers/dictionary/ptc";
export declare class OriginDestination {
    CabinType: {
        CabinTypeCode: string;
        PrefLevel: {
            PrefLevelCode: string;
        };
    };
    CarrierPrefRefID?: string;
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
    FlightRequest: {
        FlightRequestOriginDestinationsCriteria: {
            OriginDestCriteria: OriginDestination[];
        };
    };
    Paxs: {
        Pax: Pax[];
    };
    ShoppingCriteria: ShoppingCriteria[];
    get xmlns(): {
        "xmlns:shop": string;
    };
    get nodeName(): string;
}
export declare type CarrierCriteria = {
    Carrier: {
        AirlineDesigCode: string;
    }[];
    CarrierPrefID: string;
};
export declare type ConnectionCriteria = {
    ConnectionPrefID: string;
    MaximumConnectionQty: number;
};
export declare type PricingMethodCriteria = {
    BestPricingOptionText: string;
};
export declare type ProgramCriteria = {
    ProgramContract?: {
        ContractID: string;
    }[];
    ProgramAccount?: {
        AccountID: string;
    }[];
    TypeCode?: string;
};
export declare type FlightCriteria = {
    RBD: {
        MixRBDInd: boolean;
        RBD_Code?: string[];
    };
};
declare type ShoppingCriteria = {
    CarrierCriteria?: CarrierCriteria[];
    ConnectionCriteria?: ConnectionCriteria[];
    FlightCriteria?: FlightCriteria[];
    ProgramCriteria?: ProgramCriteria[];
    PricingMethodCriteria?: PricingMethodCriteria[];
};
export {};
