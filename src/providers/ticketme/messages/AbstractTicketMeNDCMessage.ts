import { INDCMessage } from "../../../interfaces/INDCMessage";
import { IATAxmlns } from "../constants/xmlns";
import { PartyCredentials } from "../TicketMeRequest";

type Party = {
  Sender: {
    TravelAgencySender: {
      // "$": { "metadata": "LG1" },
      AgencyID: { _: string }[];
    }[];
  }[];
}[];

export type NodeValue<T> = { _: T };
export type StringValue = NodeValue<string>;

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
