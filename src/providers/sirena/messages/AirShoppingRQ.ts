/*
 * Copyright (c) 2023
 */
import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { SirenaPTC } from "../mappers/dictionary/ptc";
import { SirenaCabin } from "../mappers/dictionary/cabin";
import { Preflevel } from "../../../core/constants/preflevel";

export class OriginDestination {
  public Arrival: { AirportCode: StringValue[] }[] = [];
  public Departure: { AirportCode: StringValue[]; Date: StringValue[] }[] = [];
}

export class Pax {
  public $: { PassengerID: string };
  public PTC: StringValue[] = [];
  public InfantRef?: StringValue[] = [];

  constructor(id: string, ptc: SirenaPTC = SirenaPTC.ADULT) {
    this.$ = { PassengerID: id };
    this.PTC.push({ _: ptc });
  }

  attachInfant(infantRef?: string) {
    if (infantRef) {
      this.InfantRef = [{ _: infantRef }];
    }
  }
}

type AirlinePreference = {
  Airline: { $: { PreferencesLevel: Preflevel }; AirlineID: StringValue[] }[];
};
type CabinPreference = { CabinType: { Code: StringValue[] }[] };
type FlightPreference = {
  Characteristic: { DirectPreferences: StringValue[] }[];
};

/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export class AirShoppingRQ extends AbstractSirenaNDCMessage {
  public CoreQuery: {
    OriginDestinations: { OriginDestination: OriginDestination[] }[];
  }[] = [
    {
      OriginDestinations: [{ OriginDestination: [] }],
    },
  ];
  public Preference: {
    FlightPreferences?: FlightPreference[];
    CabinPreferences: CabinPreference[];
    AirlinePreferences?: AirlinePreference[];
  }[] = [
    {
      CabinPreferences: [
        { CabinType: [{ Code: [{ _: SirenaCabin.ECONOMY }] }] },
      ],
    },
  ];
  public DataLists: { PassengerList: { Passenger: Pax[] }[] }[] = [
    {
      PassengerList: [
        {
          Passenger: [],
        },
      ],
    },
  ];

  get nodeName() {
    return "AirShoppingRQ";
  }
}
