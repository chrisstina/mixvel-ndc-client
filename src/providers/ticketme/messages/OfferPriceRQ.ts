import {GenericTicketMeNDCMessage} from "./GenericTicketMeNDCMessage";

export type Offer = {
    $: { Owner: string, OfferID: string, ResponseID: string },
    OfferItem: OfferItem[]
}

type OfferItem = {
    $: { OfferItemID: string },
    PassengerRefs: {_ : string}
}

export type PaxDataList = { Passenger: { $: { PassengerID: string } } }[]

export class OfferPriceRQ extends GenericTicketMeNDCMessage {
    public Query: {Offer: Offer[]}
    public DataLists: { PassengerList: PaxDataList }

    constructor(offers: Offer[], dataLists: { PassengerList: PaxDataList }) {
        super();
        this.Query = {Offer: offers}
        this.DataLists = dataLists
    }

    get nodeName() {
        return "OfferPriceRQ"
    }
}