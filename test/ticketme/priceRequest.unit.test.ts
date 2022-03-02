import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {setProviderConfig, getPriceRequest} = createNDCService('ticketme')
setProviderConfig({party: {agencyId: 'YOUR_KASSA'}})

@suite
class PriceRequestUnitTest {
    @test 'Create price RQ several offer items'() {
        const request = getPriceRequest({
            offers: [{
                offerId: 'SOME_OFFER',
                responseId: 'SOME_RESONSE_ID',
                offerOwner: 'KW',
                offerItems: [
                    {
                        offerItemId: 'OFFER_ITEM_1',
                        paxs: 'pax1 pax2'
                    },
                    {
                        offerItemId: 'OFFER_ITEM_2',
                        paxs: 'pax3'
                    }
                ]
            }]
        })

        const rq = request.getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('OfferPriceRQ')
        expect(rq).to.contain('<Offer Owner="KW" OfferID="SOME_OFFER" ResponseID="SOME_RESONSE_ID">')
        expect(rq).to.contain('<OfferItem OfferItemID="OFFER_ITEM_1">')
        expect(rq).to.contain('<OfferItem OfferItemID="OFFER_ITEM_2">')
        expect(rq).to.contain('PassengerID="pax1"')
        expect(rq).to.contain('PassengerID="pax2"')
        expect(rq).to.contain('PassengerID="pax3"')
    }

    @test 'Validate price RQ params with general rules' () {
        const rq = getPriceRequest({
            responseId: '1234',
            offerOwner: 'KW',
            offers: [{
                offerId: 'SOME_OFFER',
                offerItems: [
                    {
                        offerItemId: 'OFFER_ITEM_1',
                        paxs: 'pax1 pax2'
                    },
                    {
                        offerItemId: 'OFFER_ITEM_2',
                        paxs: 123
                    }
                ]
            }]
        })
        expect(rq.isFailure).to.be.true
        expect(rq.error).to.contain('paxs')
    }

    @test 'Validate price RQ params with specific provider rules' () {
        const rq = getPriceRequest({
            offers: [{
                offerId: 'SOME_OFFER',
                offerItems: [
                    {
                        offerItemId: 'OFFER_ITEM_1',
                        paxs: 'pax1 pax2'
                    },
                    {
                        offerItemId: 'OFFER_ITEM_2',
                        paxs: '123'
                    }
                ]
            }]
        })
        expect(rq.isFailure).to.be.true
        expect(rq.error).to.contain('RequestValidationError: offerOwner must be longer than or equal to 1 characters')
    }
}