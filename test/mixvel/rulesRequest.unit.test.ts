import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { getFareRulesRequest } = createNDCService("mixvel");

@suite
class RulesRequestUnitTest {
  @test "Create fare rules RQ for several offer items"() {
    const rq = getFareRulesRequest({
      offers: [
        {
          offerId: "SOME-OFFER",
          offerItems: [
            {
              offerItemId: "OFFER_ITEM_1",
              paxs: "pax1 pax2",
            },
            {
              offerItemId: "OFFER_ITEM_2",
              paxs: "pax3",
            },
          ],
        },
      ],
    }).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderRulesRQ");
    expect(rq).to.contain("<RulesCoreRequest>");
    expect(rq).to.contain("<OfferID>SOME-OFFER");
    expect(rq).to.contain("<OfferItemID>OFFER_ITEM_1");
    expect(rq).to.contain("<OfferItemID>OFFER_ITEM_2");
  }

  @test "Create fare rules RQ for order"() {
    const rq = getFareRulesRequest({
      orderId: "ME12345",
    }).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderRulesRQ");
    expect(rq).to.contain("<RulesCoreRequest>");
    expect(rq).to.contain("<OrderID>ME12345");
  }
}
