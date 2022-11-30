import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getRefundCalculationRequest} = createNDCService('mixvel')

@suite
class OrderRetrieveRequestUnitTest {
    @test 'Create refund calculation for order request'() {
        const rq = getRefundCalculationRequest({
            orderId: 'FAKE-ORDER',
            orderItemIds: [
                ['SOME_ORDER', 'ITEM-1'],
                ['SOME_ORDER', 'ITEM-2']
            ]
        }).getValue().body
        console.log(rq)
        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderReshopRQ')
        expect(rq).to.contain("<MixOrderID>FAKE-ORDER")
        expect(rq).to.contain("SOME_ORDER")
    }
}