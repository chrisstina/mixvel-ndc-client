import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getPriceRequest} = createNDCService('mixvel')

@suite
class PriceRequestUnitTest {
    @test 'Create price RQ several offer items'() {
        const rq = getPriceRequest({
            offers: [
                {
                    offerId: 'SOME-OFFER',
                    offerItems: [
                        {
                            offerItemId: 'OF1'
                        },
                        {
                            offerItemId: 'OF2'
                        }]
                }
            ]
        }).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('OfferPrice:Mixvel_OfferPriceRQ')
        expect(rq).to.contain('<SelectedOffer>\n              <OfferRefID>SOME-OFFER')
        expect(rq).to.contain('<OfferItemRefID>OF1')
        expect(rq).to.contain('<OfferItemRefID>OF2')
    }
}