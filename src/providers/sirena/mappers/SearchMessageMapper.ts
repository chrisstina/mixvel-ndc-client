import { DateTime } from "luxon";

import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { SearchParams } from "../../../core/request/parameters/Search";
import { Preflevel } from "../../../core/constants/preflevel";
import {
  AirShoppingRQ,
  OriginDestination,
  Pax,
} from "../messages/AirShoppingRQ";
import { SirenaCabin, toSirena as toSirenaCabin } from "./dictionary/cabin";
import { SirenaPTC, toSirena as toSirenaPTC } from "./dictionary/ptc";

export class SearchMessageMapper implements IMessageMapper {
  message: any;

  constructor(
    public readonly params: SearchParams,
    public readonly credentials: any
  ) {
    this.message = new AirShoppingRQ();
    this.message.addParty(this.credentials);
  }

  map(): AirShoppingRQ {
    this.setCabinPreference(toSirenaCabin(this.params.cabin));
    if (this.params.onlyDirect) {
      this.setDirectPreference(Preflevel.REQUIRED);
    }
    this.params.originDestinations.forEach((od) => {
      this.addOriginDestination(
        od.from,
        od.to,
        DateTime.fromJSDate(od.dateRangeStart).toISODate()
      );
    });
    this.params.travelers.forEach(({ id, ptc }) => {
      this.addPax(generatePaxId(id), toSirenaPTC(ptc));
    });
    // @todo this.params.preferredCarriers
    return this.message;
  }

  private addPax(id: string, ptc: SirenaPTC) {
    this.message.DataLists[0].PassengerList[0].Passenger.push(new Pax(id, ptc));
  }

  /**
   * @param {string} originCode
   * @param {string} destinationCode
   * @param {string} date ISO datetime 2021-11-25
   */
  private addOriginDestination(
    originCode: string,
    destinationCode: string,
    date: string
  ) {
    const OD = new OriginDestination();
    OD.Arrival.push({ AirportCode: [{ _: destinationCode }] });
    OD.Departure.push({
      AirportCode: [{ _: originCode }],
      Date: [{ _: date }],
    });
    this.message.CoreQuery[0].OriginDestinations[0].OriginDestination.push(OD);
  }

  private setCabinPreference(cabin: SirenaCabin) {
    this.message.Preference[0].CabinPreferences[0].CabinType[0].Code[0]._ =
      cabin;
  }

  private setDirectPreference(preference: Preflevel) {
    this.message.Preference[0]["FlightPreferences"] = [
      { Characteristic: [{ NonStopPreferences: [{ _: preference }] }] },
    ];
  }
}

const generatePaxId = (id: string) => `T${id}`;
