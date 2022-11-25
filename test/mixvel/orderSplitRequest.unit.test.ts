import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getOrderSplitRequest} = createNDCService('mixvel')

@suite
class OrderSplitRequestUnitTest {
    @test 'Create order split request'() {
        const rq = getOrderSplitRequest({
            orderId: 'FAKE-ORDER', splitOrderItems: [{
                orderItemId: 'Order-1',
                paxRefs: ['Pax1']
            }]
        }).getValue().body
        console.log(rq)
        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderChangeRQ')
        expect(rq).to.contain("<MixOrderID>FAKE-ORDER")
        expect(rq).to.contain("<SplitOrder>\n              <OrderID>Order-1</OrderID>\n              <PaxRefID>Pax1</PaxRefID>")
    }
}