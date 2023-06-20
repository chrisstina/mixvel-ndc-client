import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { OrderRetrieveProps } from "../../src/core/request/parameters/OrderRetrieve";

const { setProviderConfig, getOrderRetrieveRequest } =
  createNDCService("sirena");

@suite
class OrderRetrieveRequestUnitTest {
  @test "Create Sirena retrieve RQ "() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: OrderRetrieveProps = {
      orderId: "ORDER_ID",
      offerOwner: "N4",
    };
    const r = getOrderRetrieveRequest(params).getValue();
    const rq = getOrderRetrieveRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderRetrieveRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain('<OrderID Owner="N4">ORDER_ID</OrderID>');
  }
}
