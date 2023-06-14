import { INDCMessage } from "../../../interfaces/INDCMessage";
import { Party } from "../../../core/request/types";
import { PartyCredentials } from "../SirenaRequest";

export abstract class AbstractSirenaNDCMessage implements INDCMessage {
  public $ = {
    Version: "17.2",
  };
  public Document = {};
  public Party: Party = [];

  public get nodeName() {
    return "";
  }

  public get xmlns() {
    return {};
  }

  public addParty(party: PartyCredentials) {
    this.Party.push({
      Sender: [{ TravelAgencySender: [{ AgencyID: [{ _: party.agencyId }] }] }],
    });
    if (party.contacts) {
      this.Party[0].Sender[0].TravelAgencySender[0].Contacts = [
        {
          Contact: {
            $: { ContactType: "Agency" },
            EmailContact: [
              {
                Application: [{ _: "EMAIL" }],
                Address: [{ _: party.contacts.email }],
              },
            ],
            PhoneContact: [
              {
                Application: [{ _: "PHONE" }],
                Number: [{ _: party.contacts.phone }],
              },
            ],
          },
        },
      ];
    }
  }
}
