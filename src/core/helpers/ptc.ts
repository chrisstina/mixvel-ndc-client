import { AnonymousTraveler, SearchParams } from "../request/parameters/Search";
import { Ptc } from "../constants/ptc";
import { BookParams, Passenger } from "../request/parameters/Book";

export class PtcHelper {
  static isInfant(traveler: AnonymousTraveler|Passenger) {
    return traveler.ptc === Ptc.INFANT;
  }

  static hasInfants(rq: SearchParams|BookParams) {
    if (rq instanceof SearchParams) {
      return  rq.travelers.some((traveler) => PtcHelper.isInfant(traveler));
    }
    return  rq.passengers.some((traveler) => PtcHelper.isInfant(traveler));
  }
}
