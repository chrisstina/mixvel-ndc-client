import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getRefundCalculationRequest} from "../src"

@suite
class OrderRetrieveRequestUnitTest {
    @test 'Create refund calculation for order request'() {
        const rq = getRefundCalculationRequest({orderId: 'FAKE-ORDER'}).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderReshopRQ')
        expect(rq).to.contain("<MixOrderID>FAKE-ORDER")
    }
}