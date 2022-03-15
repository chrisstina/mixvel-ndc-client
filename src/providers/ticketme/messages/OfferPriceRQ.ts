import {AbstractTicketMeNDCMessage, StringValue} from "./AbstractTicketMeNDCMessage";

export type Offer = {
    $: { Owner: string, OfferID: string, ResponseID: string },
    OfferItem: OfferItem[]
}

type OfferItem = {
    $: { OfferItemID: string },
    PassengerRefs: StringValue
}

export type PaxDataList = { Passenger: { $: { PassengerID: string } } }[]

export class OfferPriceRQ extends AbstractTicketMeNDCMessage {
    get nodeName() {
        return "OfferPriceRQ"
    }

    public Query?: { Offer: Offer[] }
    public DataLists?: { PassengerList: PaxDataList }

    constructor() {
        super();
    }
}