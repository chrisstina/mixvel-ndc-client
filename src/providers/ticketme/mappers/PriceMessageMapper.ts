import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {PriceParams} from "../../../core/request/parameters/Price";
import {OfferPriceRQ, PaxDataList} from "../messages/OfferPriceRQ";

export class PriceMessageMapper implements IMessageMapper {
    constructor(public readonly params: PriceParams,
                public readonly credentials: PartyCredentials) {
    }

    map(): OfferPriceRQ {
        const paxs: PaxDataList = []
        const offers = this.params.offers.map(offer => {
            return {
                $: {Owner: offer.offerOwner || '', OfferID: offer.offerId, ResponseID: offer.responseId || ''},
                OfferItem: offer.offerItems.map(item => {
                    if (item.paxs !== undefined) {
                        paxs.push(...item.paxs.split(' ').map(paxId => {
                            return {Passenger: {$: {PassengerID: paxId}}}
                        }))
                    }
                    return {
                        $: {OfferItemID: item.offerItemId},
                        PassengerRefs: {_: item.paxs || ''}
                    }
                })
            }
        })
        const ticketMeOfferPriceRQ = new OfferPriceRQ(offers, {PassengerList: paxs})
        ticketMeOfferPriceRQ.addParty(this.credentials)
        return ticketMeOfferPriceRQ
    }
}