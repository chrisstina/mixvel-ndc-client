import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getServiceListRequest} = createNDCService('mixvel')

@suite
class ServiceRequestUnitTest {
    @test 'Create service list RQ several offer items'() {
        const request = getServiceListRequest({
            offers: [{
                offerId: 'SOME-OFFER',
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
            }]}).getValue()

        expect(request.options.endpoint).to.equal('api/ServiceList')

        const rq = request.body
        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Service:Mixvel_ServiceListRQ')
        expect(rq).to.contain('<OfferID>SOME-OFFER')
        expect(rq).to.contain('<OfferItemID>OFFER_ITEM_1')
        expect(rq).to.contain('<OfferItemID>OFFER_ITEM_2')
    }
}