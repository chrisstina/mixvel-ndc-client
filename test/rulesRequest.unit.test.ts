import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getFareRulesRequest, getPriceRequest} from "../src"

@suite
class PriceRequestUnitTest {
    @test 'Create fare rules RQ for several offer items'() {
        const rq = getFareRulesRequest({
            offerId: 'SOME-OFFER',
            offerItemIds: ['OF1', 'OF2']
        }).body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderRulesRQ')
        expect(rq).to.contain('<RulesCoreRequest>')
        expect(rq).to.contain('<OfferID>SOME-OFFER')
        expect(rq).to.contain('<OfferItemID>OF1')
        expect(rq).to.contain('<OfferItemID>OF2')
    }
}