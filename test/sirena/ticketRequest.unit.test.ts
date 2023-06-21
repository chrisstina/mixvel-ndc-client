import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getTicketIssueRequest } =
  createNDCService("sirena");

@suite
class TicketRequestUnitTest {
  @test "Create Sirena ticket RQ for 1ADT RT"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getTicketIssueRequest({
      orderId: "SOME-ORDER-ID",
      orderOwner: "N4",
      payment: { amount: 12.44, currency: "EUR" },
      formOfPayment: { type: "BILL", data: "N123 17FEB22 ZAO FENIKC" },
    });

    const rq = request.getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderChangeRQ");
    expect(rq).to.contain('<Amount Code="EUR">12.44');
    expect(rq).to.contain("<Type>IN</Type>");
    expect(rq).to.contain('<Remarks>\n\t\t\t\t\t\t\t<Remark>N123 17FEB22 ZAO FENIKC</Remark>');
    expect(rq).to.contain('<OrderID Owner="N4">SOME-ORDER-ID</OrderID>');
  }

  @test "Fail to Ccreate Sirena ticket RQ for CARD type"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getTicketIssueRequest({
      orderId: "SOME-ORDER-ID",
      orderOwner: "N4",
      payment: { amount: 12.44, currency: "EUR" },
      formOfPayment: { type: "CARD", data: "N123 17FEB22 ZAO FENIKC" },
    });
    expect(request.isFailure).to.be.true;
  }
}
