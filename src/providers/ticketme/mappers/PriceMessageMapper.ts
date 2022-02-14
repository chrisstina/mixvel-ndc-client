import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {PriceParams} from "../../../core/request/parameters/Price";
import {OfferPriceRQ, PaxDataList} from "../messages/OfferPriceRQ";
import assert from "assert";

export class PriceMessageMapper implements IMessageMapper {
    constructor(public readonly params: PriceParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): OfferPriceRQ {
        const paxs: PaxDataList = []
        const offers = this.params.offers.map(offer => {
            assert(offer.offerOwner, 'Missing offer owner')
            assert(offer.offerId, 'Missing offer id')
            assert(offer.responseId, 'Missing response id')

            return {
                $: {Owner: offer.offerOwner, OfferID: offer.offerId, ResponseID: offer.responseId},
                OfferItem: offer.offerItems.map(item => {
                    assert(item.offerItemId !== undefined && item.paxs !== undefined, 'Missing or empty offer items')
                    paxs.push(...item.paxs.split(' ').map(paxId => {
                        return {Passenger: {$: {PassengerID: paxId}}}
                    }))
                    return {
                        $: {OfferItemID: item.offerItemId},
                        PassengerRefs: {_: item.paxs}
                    }
                })
            }
        })
        const ticketMeOfferPriceRQ = new OfferPriceRQ(offers, {PassengerList: paxs})
        ticketMeOfferPriceRQ.addParty(this.credentials)
        return ticketMeOfferPriceRQ
    }
}