import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { getOrderCancelRequest } = createNDCService("mixvel");

@suite
class OrderCancelRequestUnitTest {
  @test "Create order retrieve request"() {
    const rq = getOrderCancelRequest({ orderId: "FAKE-ORDER" }).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderCancelRQ");
    expect(rq).to.contain("<MixOrderID>FAKE-ORDER");
  }
}
