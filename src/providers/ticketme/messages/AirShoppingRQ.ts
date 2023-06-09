/*
 * Copyright (c) 2021
 */
import { StringValue } from "../../../core/request/types";
import { AbstractTicketMeNDCMessage } from "./AbstractTicketMeNDCMessage";
import { TicketMePTC } from "../mappers/dictionary/ptc";
import { TicketMeCabin } from "../mappers/dictionary/cabin";
import { Preflevel } from "../../../core/constants/preflevel";

export class OriginDestination {
  // @todo <SegMaxTimePreferences>
  public Arrival: { AirportCode: StringValue[] }[] = [];
  public Departure: { AirportCode: StringValue[]; Date: StringValue[] }[] = [];
}

export class Pax {
  public $: { PassengerID: string };
  public PTC: StringValue[] = [];

  constructor(id: string, ptc: TicketMePTC = TicketMePTC.ADULT) {
    this.$ = { PassengerID: id };
    this.PTC.push({ _: ptc });
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
export class AirShoppingRQ extends AbstractTicketMeNDCMessage {
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
      CabinPreferences: [{ CabinType: [{ Code: [{ _: TicketMeCabin.ANY }] }] }],
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

  //
  // setCurrencyPreference(currencyCode) {
  //
  // }
}
