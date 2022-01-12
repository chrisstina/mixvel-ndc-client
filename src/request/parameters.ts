import {AnonymousTraveler, Cabin, OriginDestination, Passenger, PaxCategory, FopType} from "./types";

/**
 * @typedef SearchParams
 * @property {Array} originDestinations
 * @property {Array} travelers
 * @property {Cabin} cabin
 * @property {Array} preferredCarriers
 */
export type SearchParams = {
    originDestinations: OriginDestination[],
    travelers: AnonymousTraveler[],
    cabin: Cabin,
    preferredCarriers: string[] | null
}

export type AuthParams = {
    login: string
    password: string
    structureId: string
}

export type PriceParams = {
    offerId: string
    offerItemIds: string[]
}

export type BookParams = {
    offerId: string,
    offerItemIds: Array<{ id: string, ptc: PaxCategory }>,
    passengers: Array<Passenger>
}

export type TicketIssueParams = {
    orderId: string
    payment: { amount: number, currency: string }
    formOfPayment: { type: FopType, data?: string|{}}
}

export type OrderRetrieveParams = {
    orderId: string
}
