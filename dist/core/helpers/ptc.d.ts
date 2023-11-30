import { AnonymousTraveler, SearchParams } from "../request/parameters/Search";
import { BookParams, Passenger } from "../request/parameters/Book";
export declare class PtcHelper {
    static isInfant(traveler: AnonymousTraveler | Passenger): boolean;
    static hasInfants(rq: SearchParams | BookParams): boolean;
}
