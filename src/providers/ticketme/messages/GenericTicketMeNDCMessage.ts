import {GenericNDCMessage} from "../../../interfaces/GenericNDCMessage";
import {IATAxmlns} from "../constants/xmlns";
import {PartyCredentials} from "../TicketMeRequest";

type Party = {
    "Sender": {
        "TravelAgencySender": {
            // "$": { "metadata": "LG1" },
            "AgencyID": { "_": string }[]
        }[]
    }[]
}[]

export type StringValue = {_: string}

export class GenericTicketMeNDCMessage implements GenericNDCMessage {
    public get nodeName() {
        return ''
    }

    public get xmlns() {
        return IATAxmlns
    }

    public $ = {
        ...this.xmlns,
        Version: '17.2'
    }
    public Document = {}
    public Party: Party = []

    public addParty(party: PartyCredentials) {
        this.Party.push({Sender: [{TravelAgencySender: [{AgencyID: [{_: party.agencyId}]}]}]})
    }
}