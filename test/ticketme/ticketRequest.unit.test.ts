import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getTicketIssueRequest } =
  createNDCService("ticketme");

@suite
class TicketRequestUnitTest {
  @test "Create TicketMe ticket RQ for 1ADT RT"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getTicketIssueRequest({
      orderId: "SOME-ORDER-ID",
      orderOwner: "KW",
      payment: { amount: 12.44, currency: "EUR" },
      formOfPayment: { type: "CASH" },
      paxs: ["pax1"],
    });

    const rq = request.getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("AirDocIssueRQ");
    expect(rq).to.contain('<Amount Code="EUR">12.44');
    expect(rq).to.contain("<Cash>");
    expect(rq).to.contain('<Order OrderID="SOME-ORDER-ID" Owner="KW">');
    console.log(rq);
  }
}
