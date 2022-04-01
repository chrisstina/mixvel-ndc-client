import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {PartyCredentials} from "../TicketMeRequest";
import {PriceParams} from "../../../core/request/parameters/Price";
import {OfferPriceRQ} from "../messages/OfferPriceRQ";

export class PriceMessageMapper implements IMessageMapper {
    message: OfferPriceRQ

    constructor(public readonly params: PriceParams,
                public readonly credentials: PartyCredentials) {
        this.message = new OfferPriceRQ()
        this.message.addParty(this.credentials)
    }

    map(): OfferPriceRQ {
        const paxs: { $: { PassengerID: string; }; }[] = []
        this.message.Query = {
            Offer: this.params.offers.map(offer => {
                return {
                    $: {Owner: offer.offerOwner || '', OfferID: offer.offerId, ResponseID: offer.responseId || ''},
                    OfferItem: offer.offerItems.map(item => {
                        if (item.paxs !== undefined) {
                            paxs.push(...item.paxs.split(' ').map(paxId => {
                                return { $: { PassengerID: paxId } }
                            }))
                        }
                        return {
                            $: {OfferItemID: item.offerItemId},
                            PassengerRefs: {_: item.paxs || ''}
                        }
                    })
                }
            })
        }
        this.message.DataLists = {PassengerList: {Passenger: paxs}}
        return this.message
    }
}