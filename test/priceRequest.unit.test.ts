import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getPriceRequest} from "../src"

@suite
class PriceRequestUnitTest {
    @test 'Create price RQ several offer items'() {
        const rq = getPriceRequest({
            offerId: 'SOME-OFFER',
            offerItemIds: ['OF1', 'OF2']
        }).toXML()

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('OfferPrice:Mixvel_OfferPriceRQ')
        expect(rq).to.contain('<SelectedOffer>\n              <OfferRefID>SOME-OFFER')
        expect(rq).to.contain('<OfferItemRefID>OF1')
        expect(rq).to.contain('<OfferItemRefID>OF2')
    }
}