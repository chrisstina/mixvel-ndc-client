import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getServiceListRequest} = createNDCService('mixvel')

@suite
class ServiceRequestUnitTest {
    @test 'Create service list RQ several offer items'() {
        const request = getServiceListRequest({
            offerId: 'SOME-OFFER',
            offerItemIds: ['OF1', 'OF2']
        }).getValue()

        expect(request.options.endpoint).to.equal('api/ServiceList')

        const rq = request.body
        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Service:Mixvel_ServiceListRQ')
        expect(rq).to.contain('<OfferID>SOME-OFFER')
        expect(rq).to.contain('<OfferItemID>OF1')
        expect(rq).to.contain('<OfferItemID>OF2')
    }
}