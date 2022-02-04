import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getOrderRetrieveRequest} = createNDCService('mixvel')

@suite
class OrderRetrieveRequestUnitTest {
    @test 'Create order retrieve request'() {
        const rq = getOrderRetrieveRequest({orderId: 'FAKE-ORDER'}).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderRetrieveRQ')
        expect(rq).to.contain("<MixOrderID>FAKE-ORDER")
    }
}