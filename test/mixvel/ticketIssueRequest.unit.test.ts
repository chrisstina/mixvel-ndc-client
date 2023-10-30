import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { getTicketIssueRequest } = createNDCService("mixvel");

@suite
class TicketIssueRequestUnitTest {
  @test "Create ticket issue request with Direct Bill FOP"() {
    const rq = getTicketIssueRequest({
      orderId: "SOME-ORDER-ID",
      payment: { amount: 12.44, currency: "EUR" },
      formOfPayment: { type: "BILL", data: "TEST LLC" },
    }).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderChangeRQ");
    expect(rq).to.contain(
      "<DirectBill>\n                  <BillInfo>TEST LLC</BillInfo>"
    );
    expect(rq).to.contain('<Amount CurCode="EUR">12.44</Amount>');
  }

  @test "Create ticket issue request with Cash FOP"() {
    const rq = getTicketIssueRequest({
      orderId: "SOME-ORDER-ID",
      payment: { amount: 0.44, currency: "EUR" },
      formOfPayment: { type: "CASH" },
    }).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderChangeRQ");
    expect(rq).to.contain("<OtherPaymentMethod/>");
    expect(rq).to.contain('<Amount CurCode="EUR">0.44</Amount>');
  }

  @test "Create ticket issue request with not enough info for FOP"() {
    expect(() => {
      getTicketIssueRequest({
        orderId: "SOME-ORDER-ID",
        payment: { amount: 0.44, currency: "EUR" },
        formOfPayment: { type: "BILL" },
      });
    }).to.throw;
  }
}
