import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
import { IATAxmlns } from "../../ticketme/constants/xmlns";

export abstract class AbstractSirenaNDCMessage implements INDCMessage {
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

  public addParty(party: { agencyId: string }) {
    this.Party.push({
      Sender: [{ TravelAgencySender: [{ AgencyID: [{ _: party.agencyId }] }] }],
    });
  }
}
