/*
 * Copyright (c) 2021
 */

import { INDCMessage } from "../../../interfaces/INDCMessage";
import { MixvelPTC } from "../mappers/dictionary/ptc";

export class OriginDestination {
  public CabinType = {
    CabinTypeCode: "",
    PrefLevel: { PrefLevelCode: "" },
  };
  public CarrierPrefRefID?: string = ""; // initialize to preserve field order

  public ConnectionPrefRefID?: string = ""; // initialize to preserve field order

  public DestArrivalCriteria = {
    IATA_LocationCode: "",
  };

  public OriginDepCriteria = {
    DateRangeStart: "",
    DateRangeEnd: "",
    IATA_LocationCode: "",
  };
}

export class Pax {
  public readonly PaxID: string;
  public readonly PTC: MixvelPTC;
  public readonly AgeMeasure: string | undefined;

  constructor(id: string, ptc: MixvelPTC = MixvelPTC.ADULT, age?: string) {
    // mind the property order!
    if (age) {
      this.AgeMeasure = age;
    }
    this.PaxID = id;
    this.PTC = ptc;
  }
}

/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export class Mixvel_AirShoppingRQ implements INDCMessage {
  public FlightRequest: {
    FlightRequestOriginDestinationsCriteria: {
      OriginDestCriteria: OriginDestination[];
    };
  } = {
    FlightRequestOriginDestinationsCriteria: {
      OriginDestCriteria: [],
    },
  };
  public Paxs: { Pax: Pax[] } = {
    Pax: [],
  };
  public ShoppingCriteria: ShoppingCriteria[] = [];

  get xmlns() {
    return {
      "xmlns:shop": "https://www.mixvel.com/API/XSD/Mixvel_AirShoppingRQ/1_01",
    };
  }

  get nodeName() {
    return "shop:Mixvel_AirShoppingRQ";
  }
}

export type CarrierCriteria = {
  Carrier: { AirlineDesigCode: string }[];
  CarrierPrefID: string;
};

export type ConnectionCriteria = {
  ConnectionPrefID: string;
  MaximumConnectionQty: number;
};

export type PricingMethodCriteria = {
  BestPricingOptionText: string;
};

export type ProgramCriteria = {
  ProgramContract?: { ContractID: string }[]; // contract number
  ProgramAccount?: { AccountID: string }[]; // promo code
  TypeCode?: string;
};

export type FlightCriteria = {
  RBD: { MixRBDInd: boolean; RBD_Code?: string[] };
};

type ShoppingCriteria = {
  CarrierCriteria?: CarrierCriteria[];
  ConnectionCriteria?: ConnectionCriteria[];
  FlightCriteria?: FlightCriteria[];
  ProgramCriteria?: ProgramCriteria[];
  PricingMethodCriteria?: PricingMethodCriteria[];
};
