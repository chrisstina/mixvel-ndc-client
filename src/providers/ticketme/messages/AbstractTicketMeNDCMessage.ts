import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
import { IATAxmlns } from "../constants/xmlns";
import { PartyCredentials } from "../TicketMeRequest";

export abstract class AbstractTicketMeNDCMessage implements INDCMessage {
  public $ = {
    ...this.xmlns,
    Version: "17.2",
  };
  public Document = {};
  public Party: Party = [];

  public get nodeName() {
    return "";
  }

  public get xmlns() {
    return IATAxmlns;
  }

  public addParty(party: PartyCredentials) {
    this.Party.push({
      Sender: [{ TravelAgencySender: [{ AgencyID: [{ _: party.agencyId }] }] }],
    });
  }
}
