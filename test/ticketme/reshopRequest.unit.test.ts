import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { RepriceParams } from "../../src/core/request/parameters/Reprice";

const { setProviderConfig, getRepriceRequest } = createNDCService("ticketme");

@suite
class ReshopRequestUnitTest {
  @test "Create TicketMe reshop RQ "() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: RepriceParams = {
      orderId: "ORDER_ID",
    };

    const rq = getRepriceRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderReshopRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain("<OrderID>ORDER_ID</OrderID>");
    expect(rq).to.contain("<Reprice></Reprice>");
  }
}
