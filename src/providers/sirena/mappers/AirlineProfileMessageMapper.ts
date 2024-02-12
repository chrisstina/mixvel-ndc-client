import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { AirlineProfileParams } from "../../../core/request/parameters/AirlineProfile";
import { AirlineProfileRQ } from "../messages/AirlineProfileRQ";
import { PartyCredentials } from "../SirenaRequest";

export class AirlineProfileMessageMapper implements IMessageMapper {
  message: AirlineProfileRQ;

  constructor(
    public readonly params: AirlineProfileParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new AirlineProfileRQ(this.params.airlineCode);
    this.message.addParty(this.credentials);
  }

  map(): AirlineProfileRQ {
    return this.message;
  }
}
