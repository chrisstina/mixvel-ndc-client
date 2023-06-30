import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { OrderRetrieveProps } from "../../src/core/request/parameters/OrderRetrieve";
import { RepriceParams } from "../../src/core/request/parameters/Reprice";

const { setProviderConfig, getOrderCancelRequest, getRepriceRequest } =
  createNDCService("sirena");

@suite
class OrderCancelRequestUnitTest {
  @test "Create Sirena cancel RQ "() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: OrderRetrieveProps = {
      orderId: "ORDER_ID",
      offerOwner: "N4",
    };
    const rq = getOrderCancelRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderCancelRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain('OrderID="ORDER_ID');

    const paramsReprice: RepriceParams = {
      orderId: "ORDER_ID",
      deleteOrderItems: [
        "offer-flt-1",
        "offer-svc-1",
      ],
    };
    const rqReprice = getRepriceRequest(paramsReprice).getValue().body;
    console.log(rqReprice);
    expect(rqReprice).to.not.contain("undefined");
    expect(rqReprice).to.contain("OrderReshopRQ");
    expect(rqReprice).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rqReprice).to.contain('<OrderID>ORDER_ID</OrderID>');
  }
}
