import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { RepriceProps } from "../../src/core/request/parameters/Reprice";

const { setProviderConfig, getRepriceRequest } =
  createNDCService("sirena");

@suite
class OrderRetrieveRequestUnitTest {
  @test "Create Sirena reprice RQ "() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: RepriceProps = {
      orderId: "ORDER_ID",
    };
    const rq = getRepriceRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderReshopRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain('<OrderID>ORDER_ID');
    expect(rq).to.contain('<Reprice></Reprice>');
  }
  @test "Create Sirena delete order items RQ "() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: RepriceProps = {
      orderId: "ORDER_ID",
      deleteOrderItems: ["ORDER_ITEM_1", "ORDER_ITEM_2"],
    };
    const rq = getRepriceRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderReshopRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain('<OrderID>ORDER_ID</OrderID>');
    expect(rq).to.contain('<OrderServicing>');
    expect(rq).to.contain('<Delete>\n\t\t\t\t\t<OrderItem OrderItemID="ORDER_ITEM_1">');
  }
}
