import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getRefundRequest} from "../src"

@suite
class RefundRequestUnitTest {
    @test 'Create order refund request for all order items'() {
        const rq = getRefundRequest({
            orderId: 'MIXVEL-ORDER-ID',
            orderItemIds: [
                ['SOME_ORDER', 'ITEM-1'],
                ['SOME_ORDER', 'ITEM-2']
            ]
        }).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderChangeRQ')
        expect(rq).to.contain('<MixOrderID>MIXVEL-ORDER-ID</MixOrderID>')
        expect(rq).to.contain('<DeleteOrderItem>')
        expect(rq).to.contain('<OrderID>SOME_ORDER</OrderID>')
        expect(rq).to.contain('<OrderItemID>ITEM-1</OrderItemID>')
        expect(rq).to.contain('<OrderItemID>ITEM-1</OrderItemID>')
    }
}